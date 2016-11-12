import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tooltip, Origin } from '../../src/index';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Style Example</h1>

        <p>
          If you want to apply a style defined in external CSS file,<br />
          you can give <Origin name="id-tip" className="target"><code>class</code></Origin> and <Origin name="class-tip" className="target"><code>id</code></Origin> attributes to the DIV element of a tooltip.
        </p>

        <Tooltip name="id-tip" id="my-id">
          This is a <b>id</b> tooltip.
        </Tooltip>

        <Tooltip name="class-tip" className="my-class">
          This is a <b>class</b> tooltip.
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
