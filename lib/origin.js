'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _blacklist = require('blacklist');

var _blacklist2 = _interopRequireDefault(_blacklist);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Origin = function (_Component) {
  _inherits(Origin, _Component);

  function Origin() {
    _classCallCheck(this, Origin);

    return _possibleConstructorReturn(this, (Origin.__proto__ || Object.getPrototypeOf(Origin)).apply(this, arguments));
  }

  _createClass(Origin, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // hide the tooltip
      var props = (0, _blacklist2.default)(this.props, 'children');
      this.props.dispatch((0, _actions.hide)(_extends({}, props)));
    }
  }, {
    key: 'createWithDelay',
    value: function createWithDelay(creator) {
      var extras = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _props = this.props,
          duration = _props.delay,
          callback = _props.onTimeout;

      var props = (0, _blacklist2.default)(this.props, 'children');
      var action = creator(_extends({}, props, extras));
      if (duration || callback) {
        action = (0, _actions.delay)(action, { duration: duration, callback: callback });
      }
      return action;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = (0, _blacklist2.default)(this.props, 'name', 'content', 'place', 'tagName', 'delay', 'delayOn', 'dispatch', 'onTimeout', 'onHover', 'onLeave');

      if (!props.onMouseEnter) {
        props.onMouseEnter = function (e) {
          var props = (0, _blacklist2.default)(_this2.props, 'children');
          var action = ['show', 'both'].indexOf(_this2.props.delayOn) !== -1 ? _this2.createWithDelay(_actions.show, { origin: e.target.id || e.target }) : (0, _actions.show)(_extends({}, props, { origin: e.target.id || e.target }));
          _this2.props.dispatch(action);
          _this2.props.onHover && _this2.props.onHover(e);
        };
      }

      if (!props.onMouseLeave) {
        props.onMouseLeave = function (e) {
          var props = (0, _blacklist2.default)(_this2.props, 'children');
          var action = ['hide', 'both'].indexOf(_this2.props.delayOn) !== -1 ? _this2.createWithDelay(_actions.hide) : (0, _actions.hide)(_extends({}, props));
          _this2.props.dispatch(action);
          _this2.props.onLeave && _this2.props.onLeave(e);
        };
      }

      return _react2.default.createElement(this.props.tagName, _extends({}, props, { ref: 'wrapper'
      }));
    }
  }], [{
    key: 'wrapBy',
    value: function wrapBy(tagName) {
      var CustomOrigin = function (_Origin) {
        _inherits(CustomOrigin, _Origin);

        function CustomOrigin() {
          _classCallCheck(this, CustomOrigin);

          return _possibleConstructorReturn(this, (CustomOrigin.__proto__ || Object.getPrototypeOf(CustomOrigin)).apply(this, arguments));
        }

        _createClass(CustomOrigin, null, [{
          key: 'displayName',
          get: function get() {
            return Origin.displayName + '.' + tagName;
          }
        }, {
          key: 'defaultProps',
          get: function get() {
            return _extends({}, Origin.defaultProps, {
              tagName: tagName
            });
          }
        }]);

        return CustomOrigin;
      }(Origin);

      return (0, _reactRedux.connect)()(CustomOrigin);
    }
  }, {
    key: 'displayName',
    get: function get() {
      return 'Origin';
    }
  }, {
    key: 'propTypes',
    get: function get() {
      return {
        name: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
        content: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object, _propTypes2.default.arrayOf(_propTypes2.default.object)]),
        place: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.string)]),
        tagName: _propTypes2.default.string,
        delay: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number, _propTypes2.default.string]),
        delayOn: _propTypes2.default.oneOf(['show', 'hide', 'both']),
        onTimeout: _propTypes2.default.func,
        onMouseEnter: _propTypes2.default.func,
        onMouseLeave: _propTypes2.default.func,
        onHover: _propTypes2.default.func,
        onLeave: _propTypes2.default.func
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        delayOn: 'hide',
        tagName: 'span'
      };
    }
  }]);

  return Origin;
}(_react.Component);

exports.default = (0, _reactRedux.connect)()(Origin);