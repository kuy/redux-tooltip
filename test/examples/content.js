import assert from 'power-assert';
import { CSSStyleDeclaration } from 'cssstyle';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { Tooltip, Origin } from '../../src/index';
import App from '../../examples/content/app';
import store from '../../examples/common/store';

describe('Content Example', () => {
  let style;
  before(() => {
    style = new CSSStyleDeclaration();
    document.body.innerHTML += '<div id="container" style="position:absolute;top:0;left:0;"></div>';
  });

  let app, tooltip, clock;
  beforeEach(() => {
    const tree = ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
    document.getElementById('container'));

    app = TestUtils.findRenderedComponentWithType(tree, App.WrappedComponent);
    let component = TestUtils.findRenderedComponentWithType(tree, Tooltip.WrappedComponent);
    tooltip = component.refs.tooltip;

    clock = new sinon.useFakeTimers();
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById('container'));
    clock.restore();
  });

  describe('default content', () => {
    it('should be worked', () => {
      // Mouse Enter
      const origin = document.querySelector('p .target.default');
      TestUtils.Simulate.mouseEnter(origin);

      style.cssText = tooltip.getAttribute('style');
      assert(style.getPropertyValue('visibility') === 'visible');
      assert(tooltip.innerText === 'This is a default content.\n', 'should be default content');
    });
  });

  describe('custom content', () => {
    it('should be worked', () => {
      // Mouse Enter
      const origin = document.querySelector('p .target.custom');
      TestUtils.Simulate.mouseEnter(origin);

      style.cssText = tooltip.getAttribute('style');
      assert(style.getPropertyValue('visibility') === 'visible');
      assert(tooltip.innerText === 'This is a custom content.\n', 'should be custom content');
    });
  });

  describe('continuous updating content', () => {
    it('should be worked', () => {
      // Mouse Enter
      const origin = document.querySelector('p .target.time');
      TestUtils.Simulate.mouseEnter(origin);

      style.cssText = tooltip.getAttribute('style');
      assert(style.getPropertyValue('visibility') === 'visible');
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
