import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { show, hide } from './actions';

class Origin extends Component {
  static get displayName() {
    return 'Origin';
  }

  render () {
    const props = { ...this.props };
    delete props['dispatch'];

    if (!props.onMouseOver) {
      // Set default hover handler
      props.onMouseOver = e => {
        this.props.dispatch(show({ ...this.props, el: e.target }));
      };
    }

    if (!props.onMouseOut) {
      // Set default leave handler
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

export default connect()(Origin);
