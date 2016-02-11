'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Origin = function (_Component) {
  _inherits(Origin, _Component);

  function Origin() {
    _classCallCheck(this, Origin);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Origin).apply(this, arguments));
  }

  _createClass(Origin, [{
    key: 'createWithDelay',
    value: function createWithDelay(creator) {
      var extras = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var _props = this.props;
      var duration = _props.delay;
      var callback = _props.onTimeout;

      var action = creator(_extends({}, this.props, extras));
      if (duration || callback) {
        action = (0, _actions.delay)(action, { duration: duration, callback: callback });
      }
      return action;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = _extends({}, this.props);
      delete props['dispatch'];

      if (!props.onMouseEnter) {
        props.onMouseEnter = function (e) {
          var action = ['show', 'both'].indexOf(_this2.props.delayOn) !== -1 ? _this2.createWithDelay(_actions.show, { origin: e.target }) : (0, _actions.show)(_extends({}, _this2.props, { origin: e.target }));
          _this2.props.dispatch(action);
          _this2.props.onHover && _this2.props.onHover(e);
        };
      }

      if (!props.onMouseLeave) {
        props.onMouseLeave = function (e) {
          var action = ['hide', 'both'].indexOf(_this2.props.delayOn) !== -1 ? _this2.createWithDelay(_actions.hide) : (0, _actions.hide)(_extends({}, _this2.props));
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

          return _possibleConstructorReturn(this, Object.getPrototypeOf(CustomOrigin).apply(this, arguments));
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
        name: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]),
        content: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object, _react.PropTypes.arrayOf(_react.PropTypes.object)]),
        place: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.arrayOf(_react.PropTypes.string)]),
        tagName: _react.PropTypes.string,
        delay: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.number, _react.PropTypes.string]),
        delayOn: _react.PropTypes.oneOf(['show', 'hide', 'both']),
        onTimeout: _react.PropTypes.func,
        onMouseEnter: _react.PropTypes.func,
        onMouseLeave: _react.PropTypes.func
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