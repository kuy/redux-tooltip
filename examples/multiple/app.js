import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, Origin } from '../../src/index';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Multiple Example</h1>

        <p>
          You can put multiple tooltips using 'name' props: <Origin className="target" name="green">Green</Origin> tooltip and <Origin className="target" name="red">Red</Origin> tooltip.
        </p>

        <p>
          If you pass a list of tooltip names as 'name' props, the specified tooltips will be shown <Origin className="target" name={['green', 'red']}>at once</Origin>.
        </p>

        <Tooltip name="green" place="right">
          This is a <b style={{ color: 'green' }}>Green</b> tooltip.
        </Tooltip>

        <Tooltip name="red" place="left">
          This is a <b style={{ color: 'red' }}>Red</b> tooltip.
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
