import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, Origin, actions } from '../../src/index';

const { content } = actions;

function now() {
  const now = new Date();
  return now.toString();
}

class App extends Component {
  constructor(props) {
    super(props);

    this.handleHover = this.handleHover.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  handleHover() {
    this.updateContent();
    this.token = setInterval(() => {
      this.updateContent();
    }, 1000);
  }

  handleLeave() {
    clearInterval(this.token);
  }

  updateContent() {
    this.props.dispatch(content(now()));
  }

  render() {
    return (
      <div>
        <h1>Content Example</h1>

        <p>
          If you provide a <Origin className="target" content="This is a custom content.">custom</Origin> content of tooltip via props,
          it will be used instead of a <Origin className="target">default</Origin> content of Tooltip component.
        </p>

        <p>
          What time is it <Origin className="target" place="right" onHover={this.handleHover} onLeave={this.handleLeave}>now</Origin>?
        </p>

        <Tooltip>
          This is a default content.
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
