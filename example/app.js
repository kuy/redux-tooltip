import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, handlers } from '../src/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.handlers = handlers(this.props.dispatch)
  }

  render() {
    return (
      <div>
        <h1>Basic Example</h1>

        <p>
          You can put a tooltip on <span className="target" {...this.handlers}>a text</span>.
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
