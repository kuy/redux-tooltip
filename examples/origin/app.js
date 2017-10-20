import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tooltip, Origin, actions } from '../../src/index';

const SVGOrigin = Origin.wrapBy('g');

class App extends Component {
  constructor(props) {
    super(props);
    this.handleMove = this.handleMove.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  handleMove(e) {
    const origin = { x: e.clientX, y: e.clientY };
    this.props.dispatch(actions.show({ origin, content: 'Moving Tooltip!' }));
  }

  handleLeave() {
    this.props.dispatch(actions.hide());
  }

  render() {
    return (
      <div>
        <h1>Origin Example</h1>

        <h2>Custom Origin</h2>
        <p>
          <svg width="240" height="70">
            <g transform="translate(40, 10)">
              <SVGOrigin className="red" content="Red">
                <rect fill="red" x="0" y="0" width="50" height="50" />
              </SVGOrigin>
              <SVGOrigin className="green" content="Green">
                <circle fill="green" cx="85" cy="25" r="25" />
              </SVGOrigin>
              <g transform="translate(120, 0)">
                <SVGOrigin className="blue" content="Blue">
                  <rect fill="blue" x="0" y="0" width="50" height="50" />
                </SVGOrigin>
                <g transform="translate(15, 15)">
                  <SVGOrigin className="inner" content="Inner">
                    <rect fill="lightblue" x="0" y="0" width="20" height="20" />
                  </SVGOrigin>
                </g>
              </g>
            </g>
          </svg>
        </p>

        <h2>Moving Tooltip</h2>
        <div
          className="moving"
          style={{ width: '260px', height: '120px', backgroundColor: 'lightgray' }} 
          onMouseMove={this.handleMove}
          onMouseLeave={this.handleLeave}
        />

        <Tooltip />
      </div>
    );
  }
}

function select(state) {
  const { app } = state;
  return { app };
}

export default connect(select)(App);
