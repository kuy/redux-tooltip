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

  let app, page, tooltip;
  beforeEach(() => {
    const tree = ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
    document.getElementById('container'));

    app = TestUtils.findRenderedComponentWithType(tree, App.WrappedComponent);
    page = TestUtils.findRenderedComponentWithType(tree, Page);
    const component = TestUtils.findRenderedComponentWithType(tree, Tooltip.WrappedComponent);
    tooltip = component.refs.tooltip;
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById('container'));
  });

  describe('basic tooltip', () => {
    it('should be worked', () => {
      // Mouse Enter
      const origin = document.querySelector('p.basic .target');
      TestUtils.Simulate.mouseEnter(origin);

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
      const first = document.querySelector('p.multiple .target.first');
      const second = document.querySelector('p.multiple .target.second');
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
      const origin = document.querySelector('p.image > span');
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
      const right = document.querySelector('p.placement .target.right');
      TestUtils.Simulate.mouseEnter(right);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be shown');

      const rightOri = position(right);
      const rightTip = position(tooltip);
      assert(tooltip.innerText === 'This is a tooltip.\n');
      assert(rightOri.left < rightTip.left);

      // Mouse Enter (bottom origin)
      const bottom = document.querySelector('p.placement .target.bottom');
      TestUtils.Simulate.mouseEnter(bottom);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be shown');

      const bottomOri = position(bottom);
      const bottomTip = position(tooltip);
      assert(tooltip.innerText === 'This is a tooltip.\n');
      assert(bottomOri.top < bottomTip.top);

      // Mouse Enter (left origin)
      const left = document.querySelector('p.placement .target.left');
      TestUtils.Simulate.mouseEnter(left);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be shown');

      const leftOri = position(left);
      const leftTip = position(tooltip);
      assert(tooltip.innerText === 'This is a tooltip.\n');
      assert(leftTip.left < leftOri.left);

      // Mouse Enter (top origin)
      const top = document.querySelector('p.placement .target.top');
      TestUtils.Simulate.mouseEnter(top);
      assert(getStyleValue(tooltip, 'visibility') === 'visible', 'tooltip should be shown');

      const topOri = position(top);
      const topTip = position(tooltip);
      assert(tooltip.innerText === 'This is a tooltip.\n');
      assert(topTip.top < topOri.top);
    });
  });
});
