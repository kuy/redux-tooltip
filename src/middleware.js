export default function middleware(store) {
  return next => action => {
    if (!action.meta || !action.meta.delay) {
      return next(action);
    }

    setTimeout(() => {
      delete action.meta['delay'];
      next(action);
    }, action.meta.delay);
  };
}
