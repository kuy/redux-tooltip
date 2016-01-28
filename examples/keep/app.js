import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, Origin, actions } from '../../src/index';

const { show, hide, keep, delay } = actions;

// Inject 'of' method to make curried function easily
function inject(func, that) {
  func.of = name => {
    return e => {
      return func.call(that, name, e);
    };
  };
}

class App extends Component {
  constructor(props) {
    super(props);

    inject(this.handleHover, this);
    inject(this.handleLeave, this);
  }

  handleHover(name, e) {
    this.props.dispatch(keep({ name }));
  }

  handleLeave(name, e) {
    this.props.dispatch(hide({ name }));
  }

  render() {
    return (
      <div>
        <h1>Keep Example</h1>

        <h2>Text</h2>
        <ol>
          <li>Hover on <Origin name="text" className="target" delay>an origin element</Origin></li>
          <li>Hover on a tooltip</li>
          <li>You can keep tooltip!</li>
        </ol>

        <Tooltip name="text" onHover={this.handleHover.of('text')} onLeave={this.handleLeave.of('text')}>
          Hover and keep tooltip :)
        </Tooltip>

        <h2>SVG</h2>
        <p>
          This tooltip has <Origin name="svg" className="target" delay>SVG</Origin> content.
        </p>

        <Tooltip name="svg" onHover={this.handleHover.of('svg')} onLeave={this.handleLeave.of('svg')}>
          <div className="svg-frame">
            <svg height="210" width="210">
              <polygon points="100,10 40,198 190,78 10,78 160,198" style={{ fill: 'lime', stroke: 'purple', strokeWidth: 5, fillRule: 'nonzero' }} />
            </svg>
          </div>
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
