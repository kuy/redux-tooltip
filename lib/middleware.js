'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = middleware;

var _actions = require('./actions');

var _utils = require('./utils');

function middleware(store) {
  return function (next) {
    return function (action) {
      if (!action.meta || !action.meta.delay) {
        return next(action);
      }

      var names = (0, _utils.resolve)(action);
      names.forEach(function (name) {
        var token = setTimeout(function () {
          var _store$getState = store.getState();

          var tooltips = _store$getState.tooltip;

          var tooltip = tooltips[name];

          // Ignore if token is cleared
          if (tooltip.timeout !== null) {
            // Clear timeout token
            next((0, _actions.endTimeout)({ name: name }));

            // Dispatch original action
            delete action.meta['delay'];
            next(action);
          }
        }, action.meta.delay);

        // Store timeout token
        next((0, _actions.startTimeout)({ name: name, token: token }));
      });

      return names;
    };
  };
}