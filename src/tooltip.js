import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { placement, resolve } from './utils';
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
      place: PropTypes.string.isRequired,
      el: PropTypes.object,
      content: PropTypes.string,

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
    };
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillUpdate(nextProps) {
    const { el, place } = nextProps;
    if (el && (this.props.el != el || this.props.place !== place)) {
      const offset = placement(place, this.refs.tooltip, el);
      this.setState(offset);
    }
  }

  render () {
    const { content, place, onHover, onLeave } = this.props;
    const visibility = (this.props.el && this.props.show) ? 'visible' : 'hidden';
    const style = {
      base: { ...styles.base, ...themes.simple.base, visibility, ...this.state },
      content: { ...styles.content, ...themes.simple.content },
      arrow: { ...styles.arrow },
      border: { ...styles.border.base, ...styles.border[place], ...themes.simple.border },
    };

    let children;
    if (content) {
      children = content;
    } else {
      children = this.props.children;
    }

    return (
      <div
        ref="tooltip"
        style={style.base}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <div ref="content" style={style.content}>
          {children}
        </div>
        <div style={style.arrow} key={`a-${place}`}>
          <span ref="border" style={style.border} key={`b-${place}`}></span>
        </div>
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
