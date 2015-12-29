import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, actions } from '../../src/index';

const { show, hide } = actions;

class App extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  handleShow(e) {
    this.props.dispatch(show({ el: this.refs.target }));
  }

  handleHide() {
    this.props.dispatch(hide());
  }

  render() {
    return (
      <div>
        <h1>Remote Example</h1>

        <p>
          A tooltip is controlled by <span ref="target" className="target">following buttons</span>.
        </p>

        <p>
          <input type="button" value="show" onClick={this.handleShow} /> <input type="button" value="hide" onClick={this.handleHide} />
        </p>

        <Tooltip>
          This is a tooltip.
        </Tooltip>
      </div>
    );
  }
}

function select(state) {
  const { app } = state;
  return { app };
}

export default connect(select)(App);
