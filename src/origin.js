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

    if (!props.onMouseEnter) {
      // Set default hover handler
      props.onMouseEnter = e => {
        this.props.dispatch(show({ ...this.props, el: e.target }));
        this.props.onHover && this.props.onHover(e);
      };
    }

    if (!props.onMouseLeave) {
      // Set default leave handler
      props.onMouseLeave = e => {
        this.props.dispatch(hide({ ...this.props }));
        this.props.onLeave && this.props.onLeave(e);
      };
    }

    return (
      <span ref="wrapper" {...props}>
        {this.props.children}
      </span>
    );
  }
}

export default connect()(Origin);
