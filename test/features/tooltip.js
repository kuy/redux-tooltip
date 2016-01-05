import assert from 'power-assert';
import { CSSStyleDeclaration } from 'cssstyle';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import TestUtils from 'react-addons-test-utils';
import { Tooltip, Origin, reducer as tooltip, actions, utils } from '../../src/index';

const reducer = combineReducers({ tooltip });
const store = createStore(reducer);

class NakedPage extends Component {
  render() {
    return (
      <div>
        <h1 ref="origin">redux-tooltip</h1>
        <p>
          This is a pen. This is <Origin>a paper</Origin>.
        </p>
        <Tooltip>
          Hello Redux!
        </Tooltip>
      </div>
    );
  }
}

const Page = connect()(NakedPage);
const style = new CSSStyleDeclaration();
const { show, hide, place } = actions;
const { position } = utils;

describe('Tooltip', () => {
  before(() => {
    document.body.innerHTML += '<div id="root"></div>';
  });

  let tree, page, tooltipComp, tooltip;
  beforeEach(() => {
    tree = ReactDOM.render(
      <Provider store={store}>
        <Page />
      </Provider>,
    document.getElementById('root'));

    page = TestUtils.findRenderedComponentWithType(tree, NakedPage);
    tooltipComp = TestUtils.findRenderedComponentWithType(tree, Tooltip.WrappedComponent);
    tooltip = tooltipComp.refs.tooltip;
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  });

  it('should be shown at the origin element', () => {
    style.cssText = tooltip.getAttribute('style');
    assert(style.getPropertyValue('visibility') === 'hidden');

    // Show tooltip
    store.dispatch(show({ el: page.refs.origin }));

    style.cssText = tooltip.getAttribute('style');
    assert(style.getPropertyValue('visibility') === 'visible');

    // Hide tooltip
    store.dispatch(hide());

    style.cssText = tooltip.getAttribute('style');
    assert(style.getPropertyValue('visibility') === 'hidden');
  });

  it('should be placed in given direction', () => {
    // Top (default)
    store.dispatch(show({ el: page.refs.origin }));
    assert(position(tooltip).top < position(page.refs.origin).top);

    // Right
    store.dispatch(place('right'));
    assert(position(page.refs.origin).left < position(tooltip).left);

    // Bottom
    store.dispatch(place('bottom'));
    assert(position(page.refs.origin).top < position(tooltip).top);

    // Left
    store.dispatch(place('left'));
    assert(position(tooltip).left < position(page.refs.origin).left);

    // Top
    store.dispatch(place('top'));
    assert(position(tooltip).top < position(page.refs.origin).top);
  });

  it('should be triggered by Origin component', () => {
    store.dispatch(hide());

    style.cssText = tooltip.getAttribute('style');
    assert(style.getPropertyValue('visibility') === 'hidden');

    // Mouse enter on Origin component
    const origin = TestUtils.findRenderedComponentWithType(tree, Origin.WrappedComponent);
    const wrapper = origin.refs.wrapper;
    TestUtils.Simulate.mouseEnter(wrapper);

    style.cssText = tooltip.getAttribute('style');
    assert(style.getPropertyValue('visibility') === 'visible');
  });
});
