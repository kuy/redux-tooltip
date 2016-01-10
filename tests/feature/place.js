import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { Tooltip, Origin, utils } from '../../src/index';
import App from '../../examples/place/app';
import store from '../../examples/common/store';
import { firstComponent, getStyleValue } from '../helpers';

const { position } = utils;

describe('Place Example', () => {
  before(() => {
    document.body.innerHTML += '<div id="container" style="position:absolute;top:0;left:0;"></div>';
  });

  let tree;
  beforeEach(() => {
    tree = ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
    document.getElementById('container'));
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById('container'));
  });

  describe("using origin's prop", () => {
    it('should be worked', () => {
      // Mouseover to right
      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      const right = firstComponent(tree, Origin.WrappedComponent, { place: 'right' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(right);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be shown');

      const rightOri = position(right);
      const rightTip = position(tooltip);
      assert(tooltip.innerText === 'This is a shared tooltip.\n');
      assert(rightOri.left < rightTip.left);

      // Mouseover to bottom
      const bottom = firstComponent(tree, Origin.WrappedComponent, { place: 'bottom' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(bottom);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be shown');

      const bottomOri = position(bottom);
      const bottomTip = position(tooltip);
      assert(tooltip.innerText === 'This is a shared tooltip.\n');
      assert(bottomOri.top < bottomTip.top);

      // Mouseover to left
      const left = firstComponent(tree, Origin.WrappedComponent, { place: 'left' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(left);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be shown');

      const leftOri = position(left);
      const leftTip = position(tooltip);
      assert(tooltip.innerText === 'This is a shared tooltip.\n');
      assert(leftTip.left < leftOri.left);

      // Mouseover to top
      const top = firstComponent(tree, Origin.WrappedComponent, { place: 'top' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(top);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be shown');

      const topOri = position(top);
      const topTip = position(tooltip);
      assert(tooltip.innerText === 'This is a shared tooltip.\n');
      assert(topTip.top < topOri.top);
    });
  });

  describe("using tooltip's prop", () => {
    it('should be worked', () => {
      // Mouseover to right
      const rightTooltip = firstComponent(tree, Tooltip.WrappedComponent, { name: 'right' }).refs.tooltip;
      const right = firstComponent(tree, Origin.WrappedComponent, { name: 'right' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(right);
      assert(getStyleValue(rightTooltip, 'visibility') === 'visible', 'tooltip should be shown');

      const rightOri = position(right);
      const rightTip = position(rightTooltip);
      assert(rightTooltip.innerText === 'This is a right tooltip.\n');
      assert(rightOri.left < rightTip.left);

      // Mouseover to bottom
      const bottomTooltip = firstComponent(tree, Tooltip.WrappedComponent, { name: 'bottom' }).refs.tooltip;
      const bottom = firstComponent(tree, Origin.WrappedComponent, { name: 'bottom' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(bottom);
      assert(getStyleValue(bottomTooltip, 'visibility') === 'visible', 'tooltip should be shown');

      const bottomOri = position(bottom);
      const bottomTip = position(bottomTooltip);
      assert(bottomTooltip.innerText === 'This is a bottom tooltip.\n');
      assert(bottomOri.top < bottomTip.top);

      // Mouseover to left
      const leftTooltip = firstComponent(tree, Tooltip.WrappedComponent, { name: 'left' }).refs.tooltip;
      const left = firstComponent(tree, Origin.WrappedComponent, { name: 'left' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(left);
      assert(getStyleValue(leftTooltip, 'visibility') === 'visible', 'tooltip should be shown');

      const leftOri = position(left);
      const leftTip = position(leftTooltip);
      assert(leftTooltip.innerText === 'This is a left tooltip.\n');
      assert(leftTip.left < leftOri.left);

      // Mouseover to top
      const topTooltip = firstComponent(tree, Tooltip.WrappedComponent, { name: 'top' }).refs.tooltip;
      const top = firstComponent(tree, Origin.WrappedComponent, { name: 'top' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(top);
      assert(getStyleValue(topTooltip, 'visibility') === 'visible', 'tooltip should be shown');

      const topOri = position(top);
      const topTip = position(topTooltip);
      assert(topTooltip.innerText === 'This is a top tooltip.\n');
      assert(topTip.top < topOri.top);
    });
  });
});
