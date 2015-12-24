'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function position(el) {
  var pos = el.getBoundingClientRect();
  var _window = window;
  var pageYOffset = _window.pageYOffset;
  var pageXOffset = _window.pageXOffset;
  var _document$documentEle = document.documentElement;
  var scrollTop = _document$documentEle.scrollTop;
  var clientTop = _document$documentEle.clientTop;
  var scrollLeft = _document$documentEle.scrollLeft;
  var clientLeft = _document$documentEle.clientLeft;

  var winTop = (pageYOffset || scrollTop) - clientTop;
  var winLeft = (pageXOffset || scrollLeft) - clientLeft;

  return {
    top: pos.top + winTop,
    left: pos.left + winLeft,
    right: pos.right + winLeft,
    bottom: pos.bottom + winTop,
    width: pos.width,
    height: pos.height
  };
}

var Tooltip = (function (_Component) {
  _inherits(Tooltip, _Component);

  _createClass(Tooltip, null, [{
    key: 'displayName',
    get: function get() {
      return 'Tooltip';
    }
  }, {
    key: 'propTypes',
    get: function get() {
      return {
        // Props from state tree
        show: _react.PropTypes.bool.isRequired,
        el: _react.PropTypes.object,

        // Props from wrapper props
        hoge: _react.PropTypes.func
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        show: false
      };
    }
  }]);

  function Tooltip(props) {
    _classCallCheck(this, Tooltip);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tooltip).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Tooltip, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      var el = nextProps.el;

      if (el && this.props.el != el) {
        var tip = position(this.refs.tooltip);
        var pos = position(nextProps.el);
        this.setState({
          top: pos.top - tip.height - 8 + 'px',
          left: pos.left + pos.width / 2 - tip.width / 2 + 'px'
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var visibility = this.props.el && this.props.show ? 'visible' : 'hidden';
      var style = _extends({ visibility: visibility }, this.state);
      return _react2.default.createElement(
        'span',
        { ref: 'tooltip', className: 'redux-tooltip', style: style },
        this.props.children
      );
    }
  }]);

  return Tooltip;
})(_react.Component);

function select(state, ownProps) {
  var tooltip = state.tooltip;

  return _extends({}, ownProps, tooltip);
}

exports.default = (0, _reactRedux.connect)(select)(Tooltip);