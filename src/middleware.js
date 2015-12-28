import { startTimeout, endTimeout } from './actions';

export default function middleware(store) {
  return next => action => {
    if (!action.meta || !action.meta.delay) {
      return next(action);
    }

    const token = setTimeout(() => {
      // Ignore if token is cleared
      const state = store.getState();
      if (state.tooltip.timeout !== null) {
        // Clear timeout token
        next(endTimeout());

        // Dispatch original action
        delete action.meta['delay'];
        next(action);
      }
    }, action.meta.delay);

    // Set timeout token
    return next(startTimeout(token));
  };
}
