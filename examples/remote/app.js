import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tooltip, actions } from '../../src/index';

const { show, hide, toggle, place } = actions;

class App extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleShowDeprecated = this.handleShowDeprecated.bind(this);
  }

  handleShow(e) {
    this.props.dispatch(show({ origin: this.refs.target }));
  }

  handleHide() {
    this.props.dispatch(hide());
  }

  handleToggle() {
    this.props.dispatch(toggle());
  }

  handlePlace(newPlace) {
    this.props.dispatch(place(newPlace));
  }

  handleShowDeprecated(e) {
    this.props.dispatch(show({ el: this.refs.target }));
  }

  render() {
    return (
      <div>
        <h1>Remote Example</h1>

        <h2>Basic</h2>

        <p>
          A tooltip is controlled by <span ref="target" className="target">following buttons</span>.
        </p>

        <p>
          <input type="button" value="Show" onClick={this.handleShow} />
          <span> </span>
          <input type="button" value="Hide" onClick={this.handleHide} />
          <span> </span>
          <input type="button" value="Toggle" onClick={this.handleToggle} />
        </p>

        <p>
          <input type="button" value="Top" onClick={() => this.handlePlace('top')} /> <input type="button" value="Right" onClick={() => this.handlePlace('right')} />
          <span> </span>
          <input type="button" value="Bottom" onClick={() => this.handlePlace('bottom')} /> <input type="button" value="Left" onClick={() => this.handlePlace('left')} />
        </p>

        <h2>Deprecated</h2>

        <p>
          <input type="button" value="Show via 'el'" onClick={this.handleShowDeprecated} />
        </p>

        <Tooltip>
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
