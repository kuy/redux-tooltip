import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { adjust, resolve, originOrEl } from './utils';
import * as styles from './styles';
import * as themes from './themes';

class Tooltip extends Component {
  static get displayName() {
    return 'Tooltip';
  }

  static get propTypes() {
    return {
      // Props from state tree
      show: PropTypes.bool.isRequired,
      origin: PropTypes.object,
      el: PropTypes.object,
      place: PropTypes.oneOfType([
        PropTypes.string, PropTypes.array
      ]).isRequired,
      content: PropTypes.string,
      auto: PropTypes.bool.isRequired,
      within: PropTypes.func,

      // Props from wrapper props
      name: PropTypes.string,
      onHover: PropTypes.func,
      onLeave: PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      show: false,
      place: 'top',
      auto: true,
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    const { place, content } = nextProps;
    const origin = originOrEl(nextProps);
    if (origin && (originOrEl(this.props) != origin || this.props.place !== place || this.props.content !== content)) {
      this.updatePosition(nextProps);
    }
  }

  updatePosition(props) {
    // Setup hidden DOM element to determine size of the content
    const content = this.children(props);
    ReactDOM.render(<div>{content}</div>, this.refs.shadow, () => {
      const state = adjust(this.refs.shadow, props);
      this.setState(state);
    });
  }

  children(props) {
    if (typeof props === 'undefined') {
      props = this.props;
    }
    const { content } = props;
    return content ? content : props.children;
  }

  render () {
    const { show, onHover, onLeave } = this.props;
    const origin = originOrEl(this.props);
    const { place, offset } = this.state;
    const content = this.children();
    const visibility = (origin && show) ? 'visible' : 'hidden';
    const style = {
      base: { ...styles.base, ...themes.simple.base, visibility, ...offset },
      content: { ...styles.content, ...themes.simple.content },
      arrow: { ...styles.arrow },
      border: { ...styles.border.base, ...styles.border[place], ...themes.simple.border },
    };
    style.shadow = { ...style.content, visibility: 'hidden', position: 'absolute' };

    return (
      <div>
        <div
          ref="tooltip"
          style={style.base}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
        >
          <div ref="content" style={style.content}>
            {content}
          </div>
          <div style={style.arrow} key={`a-${place}`}>
            <span ref="border" style={style.border} key={`b-${place}`}></span>
          </div>
        </div>
        <div ref="shadow" style={style.shadow} />
      </div>
    );
  }
}

function select(state, ownProps) {
  const { tooltip: tooltips } = state;
  const names = resolve(ownProps);
  if (1 < names.length) {
    console.error(`<Tooltip> does not accept a list of names as 'name' props: ${names}`);
  }
  const name = names[0];
  const tooltip = tooltips[name];
  return { ...tooltip, ...ownProps };
}

export default connect(select)(Tooltip);
