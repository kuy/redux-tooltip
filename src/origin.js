import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { show, hide, delay } from './actions';

class Origin extends Component {
  static get displayName() {
    return 'Origin';
  }

  createWithDelay(creator, extras = {}) {
    const { delay: delayVal } = this.props;
    let action = creator({ ...this.props, ...extras });
    if (delayVal) {
      action = delay(action, delayVal || undefined);
    }
    return action;
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
        this.props.dispatch(this.createWithDelay(hide));
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
