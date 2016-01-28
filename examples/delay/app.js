import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, Origin, actions } from '../../src/index';

const { hide, delay } = actions;

class App extends Component {
  render() {
    return (
      <div>
        <h1>Delay Example</h1>

        <h2>Basic usage</h2>
        <p>
          After leaving from <Origin delay className="target">an origin element</Origin>, a tooltip will stay a while.<br />
          The default duration is 1.5 seconds.
        </p>

        <h2>Advanced usage</h2>
        <p>
          You can specify a duration to delay hiding of a tooltip.<br />
          For example: <Origin delay={500} className="target">0.5 second</Origin>, <Origin delay="1000" className="target">1 second</Origin>, <Origin delay={2000.0} className="target">2 seconds</Origin>, <Origin delay="3000.0" className="target">3 seconds</Origin>
        </p>

        <h2>Delay on show</h2>
        <p>
          Hovering on an <Origin delay delayOn="show" className="target">origin</Origin>, but it is'n shown immediately.<br />
          You need to stay a while on it.
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
