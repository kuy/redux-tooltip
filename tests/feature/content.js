import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { Tooltip, Origin, utils } from '../../src/index';
import App from '../../examples/content/app';
import store from '../../examples/common/store';
import { firstComponent, getStyleValue } from '../helpers';

const { position } = utils;

describe('Content Example', () => {
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
    clock = new sinon.useFakeTimers();
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById('container'));
    clock.restore();
  });

  describe('default content', () => {
    it('should be worked', () => {
      // Mouseover
      const origin = firstComponent(tree, Origin.WrappedComponent, { className: 'target default' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'visible');
      assert(tooltip.innerText === "This is a default content.\nIt's a second line.", 'should be default content');
    });
  });

  describe('custom content', () => {
    it('should be worked', () => {
      // Mouseover
      const origin = firstComponent(tree, Origin.WrappedComponent, { className: 'target custom' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'visible');
      assert(tooltip.innerText === 'This is a custom content.\n', 'should be custom content');
    });

    it('should be resized', () => {
      // Mouseover on custom
      const custom = firstComponent(tree, Origin.WrappedComponent, { className: 'target custom' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(custom);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      const customPos = position(tooltip);
      TestUtils.Simulate.mouseLeave(custom);

      // Mouseover on default
      const origin = firstComponent(tree, Origin.WrappedComponent, { className: 'target default' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);

      const defaultPos = position(tooltip);
      TestUtils.Simulate.mouseLeave(origin);
 
      assert(customPos.height < defaultPos.height, "default's height is higher than custom's height");
    });
  });

  describe('HTML or DOM content', () => {
    it('should be worked if string HTML is passed', () => {
      // Mouseover
      const origin = firstComponent(tree, Origin.WrappedComponent, { className: 'target html' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'visible');
      assert(tooltip.innerText === 'This is a html content.\nSanitized by DOMPurify.\n');
      assert(tooltip.innerHTML.indexOf('</script>') === -1);
      assert(tooltip.innerHTML.indexOf('</a>') !== -1);
      assert(tooltip.innerHTML.indexOf('</b>') !== -1);
    });

    it('should be worked if DOM element is passed', () => {
      // Mouseover
      const origin = firstComponent(tree, Origin.WrappedComponent, { className: 'target dom' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'visible');
      assert(tooltip.innerText === 'RedGreenBlue\n');
      assert(tooltip.innerHTML.indexOf('</span>') !== -1);
    });
  });

  describe('continuous updating content', () => {
    it('should be worked', () => {
      // Mouseover
      const origin = firstComponent(tree, Origin.WrappedComponent, { className: 'target time' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'visible');
      let first = tooltip.innerText;

      clock.tick(1100);

      let second = tooltip.innerText;
      assert(first !== second, 'should be updated');

      clock.tick(1100);

      first = second;
      second = tooltip.innerText;
      assert(first !== second, 'should be updated');
    });

    it('should re-calculate a position of the tooltip', () => {
      // Mouseover to 'time' origin
      const time = firstComponent(tree, Origin.WrappedComponent, { className: 'target time' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(time);

      clock.tick(500);

      // Mouseover to 'custom' origin
      const custom = firstComponent(tree, Origin.WrappedComponent, { className: 'target custom' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(custom);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      const oriPos = position(custom);
      const tipPos = position(tooltip);
      const center = tipPos.left + tipPos.width / 2;
      assert(oriPos.left < center && center < oriPos.right, 'tooltip should be located a center of the origin');
    });
  });

  describe('continuous updating children', () => {
    it('should be worked', () => {
      // Mouseover
      const origin = firstComponent(tree, Origin.WrappedComponent, { className: 'target count' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent, { name: 'count' }).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'visible');
      assert(tooltip.innerText === 'Count down from 10\n');

      clock.tick(1100);
      assert(tooltip.innerText === 'Count down from 10, 9\n');

      clock.tick(5000);
      assert(tooltip.innerText === 'Count down from 10, 9, 8, 7, 6, 5, 4\n');

      clock.tick(4000);
      assert(tooltip.innerText === 'Count down from 10\n');

      clock.tick(2000);
      assert(tooltip.innerText === 'Count down from 10, 9, 8\n');

      // Mouseout
      TestUtils.Simulate.mouseLeave(origin);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden');
    });

    it('should re-calculate a position of the tooltip', () => {
      // Mouseover
      const origin = firstComponent(tree, Origin.WrappedComponent, { className: 'target count' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent, { name: 'count' }).refs.tooltip;
      const tipPos1 = position(tooltip);
      const oriPos = position(origin);

      assert(tipPos1.bottom < oriPos.top, 'tooltip should be located upon the origin');

      clock.tick(7000);
      const tipPos2 = position(tooltip);

      assert(oriPos.right < tipPos2.left, 'tooltip should be moved a right of the origin');
    });
  });
});
