import { startTimeout, endTimeout } from './actions';
import { resolve } from './utils';

export default function middleware(store) {
  return next => action => {
    if (!action.meta || !action.meta.delay) {
      return next(action);
    }

    const names = resolve(action);
    names.forEach(name => {
      const token = setTimeout(() => {
        const { tooltip: tooltips } = store.getState();
        const tooltip = tooltips[name];

        // Ignore if token is cleared
        if (tooltip.timeout !== null) {
          // Clear timeout token
          next(endTimeout({ name }));

          // Dispatch original action
          delete action.meta['delay'];
          next(action);
        }
      }, action.meta.delay);

      // Store timeout token
      next(startTimeout({ name, token }));
    });

    return names;
  };
}
