import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, actions } from '../../src/index';

const { show, hide, keep, delay } = actions;

class App extends Component {
  constructor(props) {
    super(props);

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleTooltipMouseOver = this.handleTooltipMouseOver.bind(this);
    this.handleTooltipMouseOut = this.handleTooltipMouseOut.bind(this);
  }

  handleMouseOver(e) {
    this.props.dispatch(show(e.target));
  }

  handleMouseOut() {
    this.props.dispatch(delay(hide()));
  }

  handleTooltipMouseOver() {
    this.props.dispatch(keep());
  }

  handleTooltipMouseOut() {
    this.props.dispatch(hide());
  }

  render() {
    return (
      <div>
        <h1>Keep Example</h1>

        <ol>
          <li>Hover on a text</li>
          <li>Hover on a tooltip</li>
          <li>You can keep tooltip shown</li>
        </ol>

        <p>
          This is an example for <span className="target" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>redux-tooltip</span>.
        </p>

        <Tooltip onMouseOver={this.handleTooltipMouseOver} onMouseOut={this.handleTooltipMouseOut}>
          Hover and keep tooltip :)
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
