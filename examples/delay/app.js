import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, Origin, actions } from '../../src/index';

const { hide, delay } = actions;

class App extends Component {
  handleMouseOut() {
    this.props.dispatch(delay(hide()));
  }

  render() {
    return (
      <div>
        <h1>Delay Example</h1>

        <p>
          After leaving from <Origin className="target" onMouseLeave={this.handleMouseOut.bind(this)}>an origin element</Origin>, a tooltip will stay a while.
        </p>

        <Tooltip>
          This is a <b>delay</b> tooltip.
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
