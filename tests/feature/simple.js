import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { Tooltip, Origin, utils } from '../../src/index';
import App from '../../examples/simple/app';
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
      // Mouseover
      const origin = firstComponent(tree, Origin.WrappedComponent, { className: 'target' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'visible');
      assert(position(tooltip).top < position(origin).top);
      assert(tooltip.innerText === 'This is a tooltip.\n');

      // Mouseout
      TestUtils.Simulate.mouseLeave(origin);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden');
    });
  });

  describe('multiple tooltips', () => {
    it('should be worked', () => {
      // Mouseover to first
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

      // Mouseover to second
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
      // Mouseover
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

  describe('form tooltip', () => {
    it('should be worked', () => {
      // Mouseover on user
      const user = firstComponent(tree, Origin.WrappedComponent, { className: 'user' }).refs.wrapper;
      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      TestUtils.Simulate.mouseEnter(user);
      assert(getStyleValue(tooltip, 'visibility') === 'visible');
      TestUtils.Simulate.mouseLeave(user);

      // Mouseover on domain
      const domain = firstComponent(tree, Origin.WrappedComponent, { className: 'domain' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(domain);
      assert(getStyleValue(tooltip, 'visibility') === 'visible');
      TestUtils.Simulate.mouseLeave(domain);
    });
  });

  describe('svg tooltip', () => {
    it('should be worked', () => {
      // Mouseover on red
      const red = TestUtils.findRenderedDOMComponentWithClass(tree, 'red');
      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      TestUtils.Simulate.mouseEnter(red);
      assert(getStyleValue(tooltip, 'visibility') === 'visible');
      const redPos = position(tooltip);
      TestUtils.Simulate.mouseLeave(red);

      // Mouseover on green
      const green = TestUtils.findRenderedDOMComponentWithClass(tree, 'green');
      TestUtils.Simulate.mouseEnter(green);
      assert(getStyleValue(tooltip, 'visibility') === 'visible');
      const greenPos = position(tooltip);
      TestUtils.Simulate.mouseLeave(green);

      assert(redPos.left < greenPos.left);
      assert(redPos.top === greenPos.top);

      // Mouseover on blue
      const blue = TestUtils.findRenderedDOMComponentWithClass(tree, 'blue');
      TestUtils.Simulate.mouseEnter(blue);
      assert(getStyleValue(tooltip, 'visibility') === 'visible');
      const bluePos = position(tooltip);
      TestUtils.Simulate.mouseLeave(blue);

      assert(greenPos.left < bluePos.left);
      assert(greenPos.top < bluePos.top);
    });
  });
});
