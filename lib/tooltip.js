'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _utils = require('./utils');

var _styles = require('./styles');

var styles = _interopRequireWildcard(_styles);

var _themes = require('./themes');

var themes = _interopRequireWildcard(_themes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tooltip = function (_Component) {
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
        place: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array]).isRequired,
        el: _react.PropTypes.object,
        content: _react.PropTypes.string,
        auto: _react.PropTypes.bool.isRequired,
        within: _react.PropTypes.func,

        // Props from wrapper props
        name: _react.PropTypes.string,
        onHover: _react.PropTypes.func,
        onLeave: _react.PropTypes.func
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        show: false,
        place: 'top',
        auto: true
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
      var place = nextProps.place;

      if (el && (this.props.el != el || this.props.place !== place)) {
        this.updatePosition(nextProps);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var content = prevProps.content;

      if (this.props.content !== content) {
        this.updatePosition(this.props);
      }
    }
  }, {
    key: 'updatePosition',
    value: function updatePosition(props) {
      var state = (0, _utils.adjust)(this.refs.tooltip, props);
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var content = _props.content;
      var onHover = _props.onHover;
      var onLeave = _props.onLeave;
      var _state = this.state;
      var place = _state.place;
      var offset = _state.offset;

      var visibility = this.props.el && this.props.show ? 'visible' : 'hidden';
      var style = {
        base: _extends({}, styles.base, themes.simple.base, { visibility: visibility }, offset),
        content: _extends({}, styles.content, themes.simple.content),
        arrow: _extends({}, styles.arrow),
        border: _extends({}, styles.border.base, styles.border[place], themes.simple.border)
      };

      var children = undefined;
      if (content) {
        children = content;
      } else {
        children = this.props.children;
      }

      return _react2.default.createElement(
        'div',
        {
          ref: 'tooltip',
          style: style.base,
          onMouseEnter: onHover,
          onMouseLeave: onLeave
        },
        _react2.default.createElement(
          'div',
          { ref: 'content', style: style.content },
          children
        ),
        _react2.default.createElement(
          'div',
          { style: style.arrow, key: 'a-' + place },
          _react2.default.createElement('span', { ref: 'border', style: style.border, key: 'b-' + place })
        )
      );
    }
  }]);

  return Tooltip;
}(_react.Component);

function select(state, ownProps) {
  var tooltips = state.tooltip;

  var names = (0, _utils.resolve)(ownProps);
  if (1 < names.length) {
    console.error('<Tooltip> does not accept a list of names as \'name\' props: ' + names);
  }
  var name = names[0];
  var tooltip = tooltips[name];
  return _extends({}, tooltip, ownProps);
}

exports.default = (0, _reactRedux.connect)(select)(Tooltip);