import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { Tooltip, Origin } from '../../src/index';
import App from '../../examples/content/app';
import store from '../../examples/common/store';
import { firstComponent, getStyleValue } from '../helpers';

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
      assert(tooltip.innerText === 'This is a default content.\n', 'should be default content');
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
  });

  describe('continuous updating content', () => {
    it('should be worked', () => {
      // Mouseover
      const origin = firstComponent(tree, Origin.WrappedComponent, { place: 'right' }).refs.wrapper;
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
  });
});
