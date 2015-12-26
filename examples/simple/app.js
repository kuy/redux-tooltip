import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, Origin } from '../../src/index';

class App extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div>
        <h1>Simple Example</h1>

        <p>
          This is an example for redux-tooltip.<br />
          You can put a tooltip on <Origin className="target" dispatch={dispatch}>a text</Origin>.
        </p>

        <p>
          Of course, you can also put <Origin className="target" dispatch={dispatch}>multiple</Origin> <Origin className="target" dispatch={dispatch}>tooltips</Origin>.
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
