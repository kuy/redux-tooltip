'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = middleware;

var _actions = require('./actions');

function middleware(store) {
  return function (next) {
    return function (action) {
      if (!action.meta || !action.meta.delay) {
        return next(action);
      }

      var token = setTimeout(function () {
        // Ignore if token is cleared
        var state = store.getState();
        if (state.tooltip.timeout !== null) {
          // Clear timeout token
          next((0, _actions.endTimeout)());

          // Dispatch original action
          delete action.meta['delay'];
          next(action);
        }
      }, action.meta.delay);

      // Set timeout token
      return next((0, _actions.startTimeout)(token));
    };
  };
}