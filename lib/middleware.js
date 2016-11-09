'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = middleware;

var _actions = require('./actions');

var _utils = require('./utils');

function getToken(state, name) {
  var tooltips = state.tooltip;

  var tooltip = tooltips[name];
  if (tooltip) {
    return tooltip.timeout;
  }
}

var CANCEL_TYPES = [_actions.SHOW, _actions.HIDE];

function middleware(store) {
  return function (next) {
    return function (action) {
      var names = (0, _utils.resolve)(action);
      if (CANCEL_TYPES.indexOf(action.type) !== -1) {
        // Clear timeout
        names.forEach(function (name) {
          var token = getToken(store.getState(), name);
          token && clearTimeout(token);
        });
      }

      if (!action.meta || !action.meta[_actions.DELAY]) {
        return next(action);
      }

      // Setup timeout
      var _action$meta$DELAY = action.meta[_actions.DELAY],
          duration = _action$meta$DELAY.duration,
          callback = _action$meta$DELAY.callback;

      names.forEach(function (name) {
        var newToken = setTimeout(function () {
          // Ignore if token is cleared
          var token = getToken(store.getState(), name);
          if (token !== null) {
            // Clear timeout token
            next((0, _actions.endTimeout)({ name: name }));

            // Dispatch original action
            delete action.meta[_actions.DELAY];
            next(action);

            // Notify via callback
            callback && callback(action.type, duration, action);
          }
        }, duration);

        // Store timeout token
        next((0, _actions.startTimeout)({ name: name, token: newToken }));
      });

      return names;
    };
  };
}