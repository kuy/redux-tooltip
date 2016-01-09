import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { Tooltip, Origin } from '../../src/index';
import App from '../../examples/keep/app';
import store from '../../examples/common/store';
import { firstComponent, getStyleValue } from '../helpers';

// NOTE: Required to simulate both mouseover/out and mouseenter/leave events.

describe('Keep Example', () => {
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

  describe('Text content', () => {
    it('should be worked', () => {
      // Mouseover to origin
      const origin = firstComponent(tree, Origin.WrappedComponent, { name: 'text' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);
      TestUtils.Simulate.mouseOver(origin);

      // TODO: firstComponent(tree, 'Tooltip[name="text"]')
      const tooltip = firstComponent(tree, Tooltip.WrappedComponent, { name: 'text' }).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'visible');

      // Mouseout from origin and mouseover to tooltip
      TestUtils.Simulate.mouseOut(origin);
      TestUtils.Simulate.mouseLeave(origin);
      TestUtils.Simulate.mouseEnter(tooltip);
      TestUtils.Simulate.mouseOver(tooltip);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be shown');

      // A few moments later
      clock.tick(2000);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be stil shown');

      // Mouseout from tooltip
      TestUtils.Simulate.mouseOut(tooltip);
      TestUtils.Simulate.mouseLeave(tooltip);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden', 'tooltip should be hidden');
    });
  });

  describe('SVG content', () => {
    it('should be worked', () => {
      // Mouseover to origin
      const origin = firstComponent(tree, Origin.WrappedComponent, { name: 'svg' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);
      TestUtils.Simulate.mouseOver(origin);

      // TODO: firstComponent(tree, 'Tooltip[name="svg"]')
      const tooltip = firstComponent(tree, Tooltip.WrappedComponent, { name: 'svg' }).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'visible');

      // Mouseout from origin and mouseover to tooltip
      TestUtils.Simulate.mouseOut(origin);
      TestUtils.Simulate.mouseLeave(origin);
      TestUtils.Simulate.mouseEnter(tooltip);
      TestUtils.Simulate.mouseOver(tooltip);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be shown');

      // Mouseout from tooltip base and mouseover to SVG
      const svg = document.querySelector('.svg-frame');
      TestUtils.Simulate.mouseOut(tooltip);
      TestUtils.Simulate.mouseEnter(svg);
      TestUtils.Simulate.mouseOver(svg);

      // A few moments later
      clock.tick(2000);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be stil shown');

      // Mouseout from tooltip
      TestUtils.Simulate.mouseOut(svg);
      TestUtils.Simulate.mouseLeave(svg);
      TestUtils.Simulate.mouseOut(tooltip);
      TestUtils.Simulate.mouseLeave(tooltip);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden', 'tooltip should be hidden');
    });
  });
});
