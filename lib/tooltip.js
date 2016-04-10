'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _dompurify = require('dompurify');

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
        origin: _react.PropTypes.object,
        el: _react.PropTypes.object,
        place: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.array]).isRequired,
        content: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object, _react.PropTypes.arrayOf(_react.PropTypes.object)]),
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
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var place = nextProps.place;
      var content = nextProps.content;
      var children = nextProps.children;

      var origin = (0, _utils.originOrEl)(nextProps);
      if (origin && ((0, _utils.originOrEl)(this.props) != origin || this.props.place !== place || this.props.content !== content || this.props.children !== children)) {
        this.updatePosition(nextProps);
      }
    }
  }, {
    key: 'updatePosition',
    value: function updatePosition(props) {
      var _this2 = this;

      // Render content into hidden DOM element to determine size
      var content = this.children(props);
      _reactDom2.default.render(_react2.default.createElement(
        'div',
        null,
        content
      ), this.refs.shadow, function () {
        var state = (0, _utils.adjust)(_this2.refs.shadow, props);
        _this2.setState(state);
      });
    }
  }, {
    key: 'children',
    value: function children() {
      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
      var content = props.content;

      if (typeof content === 'string') {
        content = _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: (0, _dompurify.sanitize)(content) } });
      }
      return content ? content : props.children;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var show = _props.show;
      var onHover = _props.onHover;
      var onLeave = _props.onLeave;

      var origin = (0, _utils.originOrEl)(this.props);
      var _state = this.state;
      var place = _state.place;
      var offset = _state.offset;

      var content = this.children();
      var visibility = origin && show ? 'visible' : 'hidden';
      var style = {
        base: _extends({}, styles.base, themes.simple.base, { visibility: visibility }, offset),
        content: _extends({}, styles.content, themes.simple.content),
        arrow: _extends({}, styles.arrow),
        border: _extends({}, styles.border.base, styles.border[place], themes.simple.border)
      };
      style.shadow = _extends({}, style.content, { visibility: 'hidden', position: 'absolute' });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
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
            content
          ),
          _react2.default.createElement(
            'div',
            { style: style.arrow, key: 'a-' + place },
            _react2.default.createElement('span', { ref: 'border', style: style.border, key: 'b-' + place })
          )
        ),
        _react2.default.createElement('div', { ref: 'shadow', style: style.shadow })
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