import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from './actions';

function position(el) {
  const pos = el.getBoundingClientRect();
  const { pageYOffset, pageXOffset } = window;
  const { scrollTop, clientTop, scrollLeft, clientLeft } = document.documentElement;
  const winTop = (pageYOffset || scrollTop) - clientTop;
  const winLeft = (pageXOffset || scrollLeft) - clientLeft;

  return {
    top: pos.top + winTop,
    left: pos.left + winLeft,
    right: pos.right + winLeft,
    bottom: pos.bottom + winTop,
    width: pos.width,
    height: pos.height,
  };
}

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
      hoge: PropTypes.func,
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
    const visibility = (this.props.el && this.props.show) ? 'visible' : 'hidden';
    const style = { visibility, ...this.state };
    return (
      <span ref="tooltip" className="redux-tooltip" style={style}>
        {this.props.children}
      </span>
    );
  }
}

function select(state, ownProps) {
  const { tooltip } = state;
  return { ...ownProps, ...tooltip };
}

export default connect(select)(Tooltip);
