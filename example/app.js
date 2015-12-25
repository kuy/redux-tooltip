import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, Origin, actions } from '../src/index';

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
    const { dispatch } = this.props;
    dispatch(show(e.target));
  }

  handleMouseOut() {
    const { dispatch } = this.props;
    dispatch(delay(hide()));
  }

  handleTooltipMouseOver() {
    const { dispatch } = this.props;
    dispatch(keep());
  }

  handleTooltipMouseOut() {
    const { dispatch } = this.props;
    dispatch(hide());
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div>
        <h1>Basic Example</h1>

        <p>
          This is an example for redux-tooltip.<br />
          You can put a tooltip on <span className="target" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>a text</span>.
        </p>

        <p>
          Of course, you can also put <span className="target" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>multiple</span> <span className="target" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>tooltips</span>.
        </p>

        <Tooltip onMouseOver={this.handleTooltipMouseOver} onMouseOut={this.handleTooltipMouseOut}>
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
