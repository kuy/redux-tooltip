import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, actions } from '../../src/index';

const { show, hide, delay } = actions;

class App extends Component {
  constructor(props) {
    super(props);

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver(e) {
    this.props.dispatch(show(e.target));
  }

  handleMouseOut() {
    this.props.dispatch(delay(hide()));
  }

  render() {
    return (
      <div>
        <h1>Delay Example</h1>

        <p>
          After leaving from <span className="target" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>an origin element</span>, a tooltip will stay a while.
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
