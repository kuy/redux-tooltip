import assert from 'power-assert';
import { CSSStyleDeclaration } from 'cssstyle';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { Tooltip, Origin } from '../../src/index';
import App from '../../examples/delay/app';
import store from '../../examples/common/store';
import { firstComponent, getStyleValue } from '../helpers';

describe('Delay Example', () => {
  before(() => {
    document.body.innerHTML += '<div id="container" style="position:absolute;top:0;left:0;"></div>';
  });

  let tree, clock;
  beforeEach(() => {
    tree = ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
    document.getElementById('container'));

    // Setup fake timer
    clock = new sinon.useFakeTimers();
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById('container'));

    // Take back real timer
    clock.restore();
  });

  describe('basic usage', () => {
    it('should be worked for default duration', () => {
      // Mouseover
      const origin = firstComponent(tree, Origin.WrappedComponent, { delay: true }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'visible');

      // Mouseout
      TestUtils.Simulate.mouseLeave(origin);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be kept');

      // A bit later
      clock.tick(500);
      assert(getStyleValue(tooltip, 'visibility') === 'visible');

      // Wait more
      clock.tick(1200);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden', 'tooltip should be hidden');
    });
  });

  describe('advanced usage', () => {
    it('should be worked for 0.5 second', () => {
      // Mouseover
      const origin = firstComponent(tree, Origin.WrappedComponent, { delay: true }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent, { delay: 500 }).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'visible');

      // Mouseout
      TestUtils.Simulate.mouseLeave(origin);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be kept');

      // 0.5 second later
      clock.tick(500);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden', 'tooltip should be hidden after 0.5 second');
    });

    it('should be worked for 1 second', () => {
      // Mouseover
      const origin = firstComponent(tree, Origin.WrappedComponent, { delay: true }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent, { delay: '1000' }).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'visible');

      // Mouseout
      TestUtils.Simulate.mouseLeave(origin);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be kept');

      // 1 second later
      clock.tick(1000);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden', 'tooltip should be hidden after 1 second');
    });

    it('should be worked for 5 seconds', () => {
      // Mouseover
      const origin = firstComponent(tree, Origin.WrappedComponent, { delay: true }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent, { delay: 5000.0 }).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'visible');

      // Mouseout
      TestUtils.Simulate.mouseLeave(origin);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be kept');

      // 5 seconds later
      clock.tick(5000);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden', 'tooltip should be hidden after 5 seconds');
    });
  });
});
