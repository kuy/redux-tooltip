import { SHOW, HIDE, DELAY, startTimeout, endTimeout } from './actions';
import { resolve } from './utils';

function getToken(state, name) {
  const { tooltip: tooltips } = state;
  const tooltip = tooltips[name];
  if (tooltip) {
    return tooltip.timeout;
  }
}

const CANCEL_TYPES = [SHOW, HIDE];

export default function middleware(store) {
  return next => action => {
    const names = resolve(action);
    if (CANCEL_TYPES.indexOf(action.type) !== -1) {
      // Clear timeout
      names.forEach(name => {
        const token = getToken(store.getState(), name);
        token && clearTimeout(token);
      });
    }

    if (!action.meta || !action.meta[DELAY]) {
      return next(action);
    }

    // Setup timeout
    const { duration, callback } = action.meta[DELAY];
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

          // Notify via callback
          callback && callback(action.type, duration, action);
        }
      }, duration);

      // Store timeout token
      next(startTimeout({ name, token: newToken }));
    });

    return names;
  };
}
