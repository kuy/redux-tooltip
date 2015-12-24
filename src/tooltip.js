import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from './actions';
import { position } from './utils';

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
