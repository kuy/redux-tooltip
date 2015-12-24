import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip } from '../src/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.state = { show: false, el: null };
  }

  handleMouseOver(e) {
    this.setState({ show: true, el: e.target });
  }

  handleMouseOut(e) {
    this.setState({ show: false, el: null });
  }

  render() {
    const { show, el } = this.state;
    return (
      <div>
        <h1>Basic Example</h1>

        <p>
          You can put a tooltip on <span id="me" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>a text</span>.
        </p>

        <Tooltip show={show} el={el}>
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
