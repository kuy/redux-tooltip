import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tooltip } from '../../src/index';
import Page from './page';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Simple Example</h1>

        <Page />

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
