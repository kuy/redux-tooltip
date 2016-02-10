import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { Tooltip, utils } from '../../src/index';
import App from '../../examples/remote/app';
import store from '../../examples/common/store';
import { firstComponent, getStyleValue } from '../helpers';

const { position } = utils;

describe('Remote Example', () => {
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

  describe('basic usage', () => {
    it('should be worked show/hide/toggle', () => {
      // Show button
      const show = document.querySelector('input[type="button"][value="Show"]');
      TestUtils.Simulate.click(show);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'visible');
      assert(tooltip.innerText === "This is a tooltip.\n", 'should be default content');

      // Hide button
      const hide = document.querySelector('input[type="button"][value="Hide"]');
      TestUtils.Simulate.click(hide);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden');

      // Toggle button
      const toggle = document.querySelector('input[type="button"][value="Toggle"]');
      TestUtils.Simulate.click(toggle);
      assert(getStyleValue(tooltip, 'visibility') === 'visible');

      TestUtils.Simulate.click(toggle);
      assert(getStyleValue(tooltip, 'visibility') === 'hidden');
    });

    it('should be located', () => {
      // Top button
      const top = document.querySelector('input[type="button"][value="Top"]');
      TestUtils.Simulate.click(top);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'hidden', "place action doesn't show tooltip");

      const show = document.querySelector('input[type="button"][value="Show"]');
      TestUtils.Simulate.click(show);
      TestUtils.Simulate.click(top);

      assert(getStyleValue(tooltip, 'visibility') === 'visible');
      assert(tooltip.innerText === "This is a tooltip.\n", 'should be default content');

      const topPos = position(tooltip);

      // Right button
      const right = document.querySelector('input[type="button"][value="Right"]');
      TestUtils.Simulate.click(right);
      assert(getStyleValue(tooltip, 'visibility') === 'visible');

      const rightPos = position(tooltip);

      // Bottom button
      const bottom = document.querySelector('input[type="button"][value="Bottom"]');
      TestUtils.Simulate.click(bottom);
      assert(getStyleValue(tooltip, 'visibility') === 'visible');

      const bottomPos = position(tooltip);

      // Left button
      const left = document.querySelector('input[type="button"][value="Left"]');
      TestUtils.Simulate.click(left);
      assert(getStyleValue(tooltip, 'visibility') === 'visible');

      const leftPos = position(tooltip);

      assert(topPos.top < rightPos.top);
      assert(topPos.top < bottomPos.top);
      assert(topPos.top < leftPos.top);

      assert(rightPos.right > topPos.right);
      assert(rightPos.right > bottomPos.right);
      assert(rightPos.right > leftPos.right);

      assert(bottomPos.bottom > topPos.bottom);
      assert(bottomPos.bottom > rightPos.bottom);
      assert(bottomPos.bottom > leftPos.bottom);

      assert(leftPos.left < topPos.left);
      assert(leftPos.left < rightPos.left);
      assert(leftPos.left < bottomPos.left);

      assert(topPos.left === bottomPos.left);
      assert(topPos.right === bottomPos.right);

      assert(leftPos.top === rightPos.top);
      assert(leftPos.bottom === rightPos.bottom);
    });
  });

  describe('deprecated usage', () => {
    it('should show warning in console', () => {
      // Setup spy
      const warn = sinon.spy(console, 'warn');

      // Show button
      const show = document.querySelector('input[type="button"][value="Show via \'el\'"]');
      TestUtils.Simulate.click(show);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent).refs.tooltip;
      assert(getStyleValue(tooltip, 'visibility') === 'visible');
      assert(tooltip.innerText === "This is a tooltip.\n", 'should be default content');

      assert(warn.calledOnce);
      assert(warn.firstCall.args[0] === "DEPRECATED: Use 'origin' instead of 'el' in props for Tooltip component or 'show' action.");
    });
  });
});
