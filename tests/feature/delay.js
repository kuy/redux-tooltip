import assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { Tooltip, Origin, utils } from '../../src/index';
import App from '../../examples/delay/app';
import store from '../../examples/common/store';
import { firstComponent, getStyleValue } from '../helpers';

const { position } = utils;

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
      clock.tick(1000);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden', 'tooltip should be hidden');
    });
  });

  describe('advanced usage', () => {
    it('should be worked for 0.5 second as an integer', () => {
      // Mouseover
      const origin = firstComponent(tree, Origin.WrappedComponent, { delay: 500 }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'visible');

      // Mouseout
      TestUtils.Simulate.mouseLeave(origin);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be kept');

      // 0.5 second later
      clock.tick(500);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden', 'tooltip should be hidden after 0.5 second');
    });

    it('should be worked for 1 second as a string', () => {
      // Mouseover
      const origin = firstComponent(tree, Origin.WrappedComponent, { delay: '1000' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'visible');

      // Mouseout
      TestUtils.Simulate.mouseLeave(origin);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be kept');

      // 1 second later
      clock.tick(1000);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden', 'tooltip should be hidden after 1 second');
    });

    it('should be worked for 2 seconds as a float', () => {
      // Mouseover
      const origin = firstComponent(tree, Origin.WrappedComponent, { delay: 2000.0 }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'visible');

      // Mouseout
      TestUtils.Simulate.mouseLeave(origin);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be kept');

      // 2 seconds later
      clock.tick(2000);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden', 'tooltip should be hidden after 2 seconds');
    });

    it('should be worked for 3 seconds as a string of float', () => {
      // Mouseover
      const origin = firstComponent(tree, Origin.WrappedComponent, { delay: '3000.0' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'visible');

      // Mouseout
      TestUtils.Simulate.mouseLeave(origin);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be kept');

      // 3 seconds later
      clock.tick(3000);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden', 'tooltip should be hidden after 3 seconds');
    });
  });

  describe('delay on show', () => {
    it('should be worked on show', () => {
      // Mouseover
      const origin = firstComponent(tree, Origin.WrappedComponent, { delayOn: 'show' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'hidden');

      // Mouseout 0.5 second later
      clock.tick(500);
      TestUtils.Simulate.mouseLeave(origin);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden', 'tooltip should be hidden');

      // 2 second later
      clock.tick(2000);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden', 'tooltip is still hidden');

      // Mouseover again
      TestUtils.Simulate.mouseEnter(origin);

      // 0.5 second later
      clock.tick(500);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden', 'tooltip is still hidden');

      // Wait more 1 second 
      clock.tick(1000);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be shown');

      // Mouseout
      TestUtils.Simulate.mouseLeave(origin);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden', 'tooltip should be hidden immediately');
    });

    it('should be worked on both', () => {
      // Mouseover
      const origin = firstComponent(tree, Origin.WrappedComponent, { delayOn: 'both' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'hidden');

      // 0.5 second later
      clock.tick(500);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden', 'tooltip should be hidden');

      // Mouseout before showing
      TestUtils.Simulate.mouseLeave(origin);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden', 'tooltip should be hidden');

      // Wait 2 seconds
      clock.tick(2000);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden', 'tooltip is still hidden');

      // Mouseover again
      TestUtils.Simulate.mouseEnter(origin);

      // 1.5 seconds later
      clock.tick(1500);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be shown');

      // Mouseout
      TestUtils.Simulate.mouseLeave(origin);

      // 0.5 second later
      clock.tick(500);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip is still shown');

      // Mouseover again
      TestUtils.Simulate.mouseEnter(origin);

      // Wait 2 seconds
      clock.tick(2000);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip is still shown');

      // Mouseout
      TestUtils.Simulate.mouseLeave(origin);

      // 1.5 seconds later
      clock.tick(1500);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden', 'tooltip should be hidden');
    });
  });

  describe('timeout callback', () => {
    it('should be worked', () => {
      // Mouseover and mouseout
      const origin = firstComponent(tree, Origin.WrappedComponent, { onTimeout: undefined }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);
      TestUtils.Simulate.mouseLeave(origin);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'visible');

      const pos1 = position(tooltip);

      // 2 seconds later
      clock.tick(2000);
      assert(getStyleValue(tooltip, 'visibility') === 'visible');

      const pos2 = position(tooltip);
      assert(pos2.left < pos1.left);

      // 10 seconds later
      clock.tick(10000);
      assert(getStyleValue(tooltip, 'visibility') === 'visible');
    });
  });
});
