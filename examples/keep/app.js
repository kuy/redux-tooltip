import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, actions } from '../../src/index';

const { show, hide, keep, delay } = actions;

class App extends Component {
  constructor(props) {
    super(props);

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  handleMouseOver(e) {
    this.props.dispatch(show(e.target));
  }

  handleMouseOut() {
    this.props.dispatch(delay(hide()));
  }

  handleHover() {
    this.props.dispatch(keep());
  }

  handleLeave() {
    this.props.dispatch(hide());
  }

  render() {
    return (
      <div>
        <h1>Keep Example</h1>

        <ol>
          <li>Hover on <span className="target" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>an origin element</span></li>
          <li>Hover on a tooltip</li>
          <li>You can keep tooltip!</li>
        </ol>

        <Tooltip onHover={this.handleHover} onLeave={this.handleLeave}>
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
