import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import blacklist from 'blacklist';
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
      content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.arrayOf(PropTypes.object)
      ]),
      place: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
      ]),
      tag: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
      ]),
      delay: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string
      ]),
      delayOn: PropTypes.oneOf(['show', 'hide', 'both']),
      onTimeout: PropTypes.func,
      onMouseEnter: PropTypes.func,
      onMouseLeave: PropTypes.func,
      onHover: PropTypes.func,
      onLeave: PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      delayOn: 'hide',
      tag: 'span',
    };
  }

  static wrapBy(tag) {
    class CustomOrigin extends Origin {
      static get displayName() {
        return `${Origin.displayName}.${tag}`;
      }

      static get defaultProps() {
        return {
          ...Origin.defaultProps,
          tag,
        };
      }
    }

    return connect()(CustomOrigin);
  }

  componentWillUnmount(){
    // hide the tooltip
    const props = blacklist(this.props, 'children')
    this.props.dispatch(hide({...props}));
  }

  createWithDelay(creator, extras = {}) {
    const { delay: duration, onTimeout: callback } = this.props;
    const props = blacklist(this.props, 'children')
    let action = creator({ ...props, ...extras });
    if (duration || callback) {
      action = delay(action, { duration, callback });
    }
    return action;
  }

  render() {
    const props = blacklist(this.props, 'name', 'content', 'place', 'tag', 'delay', 'delayOn', 'dispatch', 'onTimeout', 'onHover', 'onLeave');

    if (!props.onMouseEnter) {
      props.onMouseEnter = e => {
        const props = blacklist(this.props, 'children')
        const action = ['show', 'both'].indexOf(this.props.delayOn) !== -1
          ? this.createWithDelay(show, { origin: e.target.id || e.target })
          : show({ ...props, origin: e.target.id || e.target });
        this.props.dispatch(action);
        this.props.onHover && this.props.onHover(e);
      };
    }

    if (!props.onMouseLeave) {
      props.onMouseLeave = e => {
        const props = blacklist(this.props, 'children')
        const action = ['hide', 'both'].indexOf(this.props.delayOn) !== -1
          ? this.createWithDelay(hide)
          : hide({...props});
        this.props.dispatch(action);
        this.props.onLeave && this.props.onLeave(e);
      };
    }

    const WrappedComponent = this.props.tag;

    if (typeof WrappedComponent == 'function') {
      return <WrappedComponent {...props} ref='wrapper'>
        {props.children}
      </WrappedComponent>
    }

    return React.createElement(this.props.tag, {
      ...props, ref: 'wrapper'
    });
  }
}

export default connect()(Origin);
