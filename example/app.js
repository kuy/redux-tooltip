import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, Origin } from '../src/index';

class App extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div>
        <h1>Basic Example</h1>

        <p>
          This is an example for redux-tooltip.<br />
          You can put a tooltip on <Origin dispatch={dispatch} className="target">a text</Origin>.
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
