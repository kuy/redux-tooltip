import assert from 'power-assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { Tooltip, Origin } from '../../src/index';
import App from '../../examples/multiple/app';
import store from '../../examples/common/store';
import { firstComponent, getStyleValue } from '../helpers';

describe('Multiple Example', () => {
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
    it('should be worked', () => {
      // Mouseover to green origin
      const green = firstComponent(tree, Origin.WrappedComponent, { name: 'green' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(green);

      const greenTip = firstComponent(tree, Tooltip.WrappedComponent, { name: 'green' }).refs.tooltip;
      assert(getStyleValue(greenTip, 'visibility') === 'visible');
      assert(greenTip.innerText === 'This is a Green tooltip.\n');

      TestUtils.Simulate.mouseLeave(green);
      assert(getStyleValue(greenTip, 'visibility') === 'hidden');

      // Mouseover to red origin
      const red = firstComponent(tree, Origin.WrappedComponent, { name: 'red' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(red);

      const redTip = firstComponent(tree, Tooltip.WrappedComponent, { name: 'red' }).refs.tooltip;
      assert(getStyleValue(redTip, 'visibility') === 'visible');
      assert(redTip.innerText === 'This is a Red tooltip.\n');

      TestUtils.Simulate.mouseLeave(red);
      assert(getStyleValue(redTip, 'visibility') === 'hidden');

      // Mouseover to both origin
      const both = firstComponent(tree, Origin.WrappedComponent, { name: ['green', 'red'] }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(both);

      assert(getStyleValue(greenTip, 'visibility') === 'visible');
      assert(greenTip.innerText === 'This is a Green tooltip.\n');
      assert(getStyleValue(redTip, 'visibility') === 'visible');
      assert(redTip.innerText === 'This is a Red tooltip.\n');

      TestUtils.Simulate.mouseLeave(both);
      assert(getStyleValue(greenTip, 'visibility') === 'hidden');
      assert(getStyleValue(redTip, 'visibility') === 'hidden');
    });
  });
});
