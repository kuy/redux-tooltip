import { startTimeout, endTimeout, DELAY } from './actions';
import { resolve } from './utils';

function getToken(state, name) {
  const { tooltip: tooltips } = state;
  const tooltip = tooltips[name];
  if (tooltip) {
    return tooltip.timeout;
  }
}

export default function middleware(store) {
  return next => action => {
    // Clear timeout
    const names = resolve(action);
    names.forEach(name => {
      const token = getToken(store.getState(), name);
      token && clearTimeout(token);
    });

    if (!action.meta || !action.meta[DELAY]) {
      return next(action);
    }

    // Setup timeout
    names.forEach(name => {
      const newToken = setTimeout(() => {
        // Ignore if token is cleared
        const token = getToken(store.getState(), name);
        if (token !== null) {
          // Clear timeout token
          next(endTimeout({ name }));

          // Dispatch original action
          delete action.meta[DELAY];
          next(action);
        }
      }, action.meta[DELAY]);

      // Store timeout token
      next(startTimeout({ name, token: newToken }));
    });

    return names;
  };
}
