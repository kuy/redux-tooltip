'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Origin = (function (_Component) {
  _inherits(Origin, _Component);

  function Origin() {
    _classCallCheck(this, Origin);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Origin).apply(this, arguments));
  }

  _createClass(Origin, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = _extends({}, this.props);
      delete props['dispatch'];

      if (!props.onMouseOver) {
        // Set default hover handler
        props.onMouseOver = function (e) {
          _this2.props.dispatch((0, _actions.show)(_extends({}, _this2.props, { el: e.target })));
          _this2.props.onHover && _this2.props.onHover(e);
        };
      }

      if (!props.onMouseOut) {
        // Set default leave handler
        props.onMouseOut = function (e) {
          _this2.props.dispatch((0, _actions.hide)(_extends({}, _this2.props)));
          _this2.props.onLeave && _this2.props.onLeave(e);
        };
      }

      return _react2.default.createElement(
        'span',
        props,
        this.props.children
      );
    }
  }], [{
    key: 'displayName',
    get: function get() {
      return 'Origin';
    }
  }]);

  return Origin;
})(_react.Component);

exports.default = (0, _reactRedux.connect)()(Origin);