import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { show, hide, delay } from './actions';

class Origin extends Component {
  static get displayName() {
    return 'Origin';
  }

  static get propTypes() {
    return {
      name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
      ]),
      content: PropTypes.string,
      place: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
      ]),
      delay: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string
      ]),
      delayOn: PropTypes.oneOf(['show', 'hide', 'both']),
      onMouseEnter: PropTypes.func,
      onMouseLeave: PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      delayOn: 'hide'
    };
  }

  createWithDelay(creator, extras = {}) {
    const { delay: duration } = this.props;
    let action = creator({ ...this.props, ...extras });
    if (duration) {
      action = delay(action, duration || undefined);
    }
    return action;
  }

  render () {
    const props = { ...this.props };
    delete props['dispatch'];

    if (!props.onMouseEnter) {
      // Set default hover handler
      props.onMouseEnter = e => {
        const action = ['show', 'both'].indexOf(this.props.delayOn) !== -1
          ? this.createWithDelay(show, { el: e.target })
          : show({ ...this.props, el: e.target });
        this.props.dispatch(action);
        this.props.onHover && this.props.onHover(e);
      };
    }

    if (!props.onMouseLeave) {
      // Set default leave handler
      props.onMouseLeave = e => {
        const action = ['hide', 'both'].indexOf(this.props.delayOn) !== -1
          ? this.createWithDelay(hide)
          : hide({ ...this.props });
        this.props.dispatch(action);
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
