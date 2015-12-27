import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { position } from './utils';
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
      el: PropTypes.object,

      // Props from wrapper props
      onHover: PropTypes.func,
      onLeave: PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      show: false,
    };
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillUpdate(nextProps) {
    const { el } = nextProps;
    if (el && this.props.el != el) {
      const tip = position(this.refs.tooltip);
      const pos = position(nextProps.el);
      this.setState({
        top: `${pos.top - tip.height - 8}px`,
        left: `${pos.left + (pos.width / 2) - (tip.width / 2)}px`,
      });
    }
  }

  render () {
    const { onHover, onLeave } = this.props;
    const visibility = (this.props.el && this.props.show) ? 'visible' : 'hidden';
    const style = {
      base: { ...styles.base, ...themes.simple.base, visibility, ...this.state },
      content: { ...styles.content, ...themes.simple.content },
      arrow: { ...styles.arrow.base },
      border: { ...styles.border.base, ...styles.border.top, ...themes.simple.border },
    };
    return (
      <div
        ref="tooltip"
        style={style.base}
        onMouseOver={onHover}
        onMouseOut={onLeave}
      >
        <div style={style.content}>
          {this.props.children}
        </div>
        <div style={style.arrow}>
          <span style={style.border}></span>
        </div>
      </div>
    );
  }
}

function select(state, ownProps) {
  const { tooltip } = state;
  return { ...ownProps, ...tooltip };
}

export default connect(select)(Tooltip);
