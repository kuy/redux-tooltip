import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { show, hide, delay } from './actions';

export default class Origin extends Component {
  static get displayName() {
    return 'Origin';
  }

  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
    };
  }

  render () {
    const props = { ...this.props };
    if (!props.onMouseOver) {
      props.onMouseOver = e => {
        this.props.dispatch(delay(show(e.target)));
      };
    }
    if (!props.onMouseOut) {
      props.onMouseOut = () => {
        this.props.dispatch(hide());
      };
    }
    return (
      <span {...props}>
        {this.props.children}
      </span>
    );
  }
}
