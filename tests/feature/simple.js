import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { Tooltip, Origin, utils } from '../../src/index';
import App from '../../examples/simple/app';
import Page from '../../examples/simple/page';
import store from '../../examples/common/store';
import { firstComponent, getStyleValue } from '../helpers';

const { position } = utils;

describe('Simple Example', () => {
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

  describe('basic tooltip', () => {
    it('should be worked', () => {
      // Mouse Enter
      const origin = firstComponent(tree, Origin.WrappedComponent, { className: 'target' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'visible');
      assert(position(tooltip).top < position(origin).top);
      assert(tooltip.innerText === 'This is a tooltip.\n');

      // Mouse Leave
      TestUtils.Simulate.mouseLeave(origin);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden');
    });
  });

  describe('multiple tooltips', () => {
    it('should be worked', () => {
      // Mouse Enter (first origin)
      const first = firstComponent(tree, Origin.WrappedComponent, { className: 'target first' }).refs.wrapper;
      const second = firstComponent(tree, Origin.WrappedComponent, { className: 'target second' }).refs.wrapper;
      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      TestUtils.Simulate.mouseEnter(first);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be shown');

      const firstPos = position(first);
      const secondPos = position(second);
      const firstTipPos = position(tooltip);
      assert(firstTipPos.top < firstPos.top, 'tooltip should be located on top of first origin');
      assert(tooltip.innerText === 'This is a tooltip.\n');

      // Mouse Enter (second origin)
      TestUtils.Simulate.mouseEnter(second);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be shown');

      const secondTipPos = position(tooltip);
      assert(secondTipPos.top < secondPos.top, 'tooltip should be located on top of second origin');
      assert(firstTipPos.top === secondTipPos.top, 'position of both tooltips is the same');
      assert(firstTipPos.left < secondTipPos.left, 'first tooltip should be located to the left of second tooltip');
    });
  });

  describe('image tooltip', () => {
    it('should be worked', () => {
      // Mouse Enter
      const origin = firstComponent(tree, Origin.WrappedComponent, { className: 'image' }).refs.wrapper;
      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      TestUtils.Simulate.mouseEnter(origin);
      assert(getStyleValue(tooltip, 'visibility') === 'visible');

      const oriPos = position(origin);
      const tipPos = position(tooltip);
      assert(tipPos.top < oriPos.top);
      assert(oriPos.left < tipPos.left);
      assert(tipPos.right < oriPos.right);
    });
  });

  describe('placement tooltips', () => {
    it('should be worked', () => {
      // Mouse Enter (right origin)
      const right = firstComponent(tree, Origin.WrappedComponent, { className: 'target right' }).refs.wrapper;
      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      TestUtils.Simulate.mouseEnter(right);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be shown');

      const rightOri = position(right);
      const rightTip = position(tooltip);
      assert(tooltip.innerText === 'This is a tooltip.\n');
      assert(rightOri.left < rightTip.left);

      // Mouse Enter (bottom origin)
      const bottom = firstComponent(tree, Origin.WrappedComponent, { className: 'target bottom' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(bottom);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be shown');

      const bottomOri = position(bottom);
      const bottomTip = position(tooltip);
      assert(tooltip.innerText === 'This is a tooltip.\n');
      assert(bottomOri.top < bottomTip.top);

      // Mouse Enter (left origin)
      const left = firstComponent(tree, Origin.WrappedComponent, { className: 'target left' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(left);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be shown');

      const leftOri = position(left);
      const leftTip = position(tooltip);
      assert(tooltip.innerText === 'This is a tooltip.\n');
      assert(leftTip.left < leftOri.left);

      // Mouse Enter (top origin)
      const top = firstComponent(tree, Origin.WrappedComponent, { className: 'target top' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(top);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be shown');

      const topOri = position(top);
      const topTip = position(tooltip);
      assert(tooltip.innerText === 'This is a tooltip.\n');
      assert(topTip.top < topOri.top);
    });
  });
});
