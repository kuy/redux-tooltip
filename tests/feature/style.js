import assert from 'assert';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { Tooltip, Origin, utils } from '../../src/index';
import App from '../../examples/style/app';
import store from '../../examples/common/store';
import { firstComponent, getStyleValue, getComputedStyleValue } from '../helpers';

const { position } = utils;

describe('Style Example', () => {
  before(() => {
    document.body.innerHTML += '<div id="container" style="position:absolute;top:0;left:0;"></div>';
    document.body.innerHTML += `<style type="text/css">${window.__html__['examples/style.css']}</style>`;
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

  describe('id tooltip', () => {
    it('should be colored', () => {
      const origin = firstComponent(tree, Origin.WrappedComponent, { name: 'id-tip' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent, { name: 'id-tip' }).refs.tooltip;
      assert(getComputedStyleValue(tooltip, 'background-color') === 'rgb(255, 205, 210)');
      assert(tooltip.innerText === 'This is a id tooltip.');

      const border = firstComponent(tree, Tooltip.WrappedComponent, { name: 'id-tip' }).refs.border;
      assert(getComputedStyleValue(border, 'border-color') === 'rgb(255, 205, 210) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)');
    });
  });

  describe('class tooltip', () => {
    it('should be colored', () => {
      const origin = firstComponent(tree, Origin.WrappedComponent, { name: 'class-tip' }).refs.wrapper;
      TestUtils.Simulate.mouseEnter(origin);

      const tooltip = firstComponent(tree, Tooltip.WrappedComponent, { name: 'class-tip' }).refs.tooltip;
      assert(getComputedStyleValue(tooltip, 'background-color') === 'rgb(187, 222, 251)');
      assert(tooltip.innerText === 'This is a class tooltip.');

      const border = firstComponent(tree, Tooltip.WrappedComponent, { name: 'class-tip' }).refs.border;
      assert(getComputedStyleValue(border, 'border-color') === 'rgb(187, 222, 251) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)');
    });
  });
});
