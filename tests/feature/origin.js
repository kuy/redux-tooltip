import assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { Tooltip, utils } from '../../src/index';
import App from '../../examples/origin/app';
import store from '../../examples/common/store';
import { firstComponent, getStyleValue } from '../helpers';

const { position } = utils;

describe('Origin Example', () => {
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

  describe('custom origin', () => {
    it('should be worked', () => {
      // Mouseover on red
      const red = TestUtils.findRenderedDOMComponentWithClass(tree, 'red');
      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      TestUtils.Simulate.mouseEnter(red);
      assert(getStyleValue(tooltip, 'visibility') === 'visible');
      assert(tooltip.innerText === 'Red\n');
      const redPos = position(tooltip);
      TestUtils.Simulate.mouseLeave(red);

      // Mouseover on green
      const green = TestUtils.findRenderedDOMComponentWithClass(tree, 'green');
      TestUtils.Simulate.mouseEnter(green);
      assert(getStyleValue(tooltip, 'visibility') === 'visible');
      assert(tooltip.innerText === 'Green\n');
      const greenPos = position(tooltip);
      TestUtils.Simulate.mouseLeave(green);

      assert(redPos.left < greenPos.left);
      assert(redPos.top === greenPos.top);

      // Mouseover on blue
      const blue = TestUtils.findRenderedDOMComponentWithClass(tree, 'blue');
      TestUtils.Simulate.mouseEnter(blue);
      assert(getStyleValue(tooltip, 'visibility') === 'visible');
      assert(tooltip.innerText === 'Blue\n');
      const bluePos = position(tooltip);
      TestUtils.Simulate.mouseLeave(blue);

      assert(greenPos.left < bluePos.left);
      assert(redPos.top === bluePos.top);

      // Mouseover on inner
      const inner = TestUtils.findRenderedDOMComponentWithClass(tree, 'inner');
      TestUtils.Simulate.mouseEnter(inner);
      assert(getStyleValue(tooltip, 'visibility') === 'visible');
      assert(tooltip.innerText === 'Inner\n');
      const innerPos = position(tooltip);
      TestUtils.Simulate.mouseLeave(inner);

      assert(bluePos.top < innerPos.top);
      assert(Math.round(bluePos.left + bluePos.width * 0.5) === Math.round(innerPos.left + innerPos.width * 0.5));
    });
  });

  describe('moving tooltip', () => {
    it('should be worked', () => {
      // Mousemove
      const moving = document.querySelector('div.moving');
      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      const boxPos = position(moving);
      const cursor = { x: (boxPos.left + boxPos.width * 0.5), y: (boxPos.top + boxPos.height * 0.5) };
      TestUtils.Simulate.mouseMove(moving, { clientX: cursor.x, clientY: cursor.y });
      assert(getStyleValue(tooltip, 'visibility') === 'visible');
      assert(tooltip.innerText === 'Moving Tooltip!\n');

      const tipPos1 = position(tooltip);
      assert(boxPos.left < tipPos1.left);
      assert(boxPos.top < tipPos1.top);
      assert(tipPos1.width < boxPos.width);
      assert(tipPos1.height < boxPos.height);

      assert(tipPos1.top < cursor.y);
      assert(tipPos1.left < cursor.x);

      // Move more
      TestUtils.Simulate.mouseMove(moving, { clientX: cursor.x - 10, clientY: cursor.y - 10 });
      assert(getStyleValue(tooltip, 'visibility') === 'visible');

      const tipPos2 = position(tooltip);
      assert(tipPos1.left - tipPos2.left === 10);
      assert(tipPos1.top - tipPos2.top === 10);
    });
  });
});
