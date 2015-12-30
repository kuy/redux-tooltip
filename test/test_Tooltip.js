import assert from 'power-assert';
import React, { Component, PropTypes } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import TestUtils from 'react-addons-test-utils';
import { Tooltip, actions, reducer as tooltipReducer } from '../src/index';

describe('Tooltip', () => {
  const reducer = combineReducers({ tooltip: tooltipReducer });

  class NakedApp extends Component {
    render() {
      return (
        <div>
          <h1>redux-tooltip test</h1>
          <p>
            <span ref="origin">origin</span>
          </p>
          <Tooltip>
            Hello Redux!
          </Tooltip>
        </div>
      );
    }
  }

  const App = connect()(NakedApp);

  let store, tree;

  beforeEach(() => {
    store = createStore(reducer);
    tree = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  it('should be hidden by default', () => {
    const component = TestUtils.findRenderedComponentWithType(tree, Tooltip.WrappedComponent);
    const tooltip = component.refs.tooltip;
    assert(tooltip._style.getPropertyValue('visibility') === 'hidden');

    const content = component.refs.content;
    assert(content.innerHTML === 'Hello Redux!')
  });

  it('should be shown by show action', () => {
    const app = TestUtils.findRenderedComponentWithType(tree, NakedApp);
    const origin = app.refs.origin;

    store.dispatch(actions.show({ el: origin }));

    const component = TestUtils.findRenderedComponentWithType(tree, Tooltip.WrappedComponent);
    const tooltip = component.refs.tooltip;
    assert(tooltip._style.getPropertyValue('visibility') === 'visible');
  });
});
