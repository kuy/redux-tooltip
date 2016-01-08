import assert from 'power-assert';
import { CSSStyleDeclaration } from 'cssstyle';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { Tooltip, Origin } from '../../src/index';
import App from '../../examples/delay/app';
import store from '../../examples/common/store';

describe('Delay Example', () => {
  let style;
  before(() => {
    style = new CSSStyleDeclaration();
    document.body.innerHTML += '<div id="container" style="position:absolute;top:0;left:0;"></div>';
  });

  let app, tooltip, origin, clock;
  beforeEach(() => {
    const tree = ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
    document.getElementById('container'));

    app = TestUtils.findRenderedComponentWithType(tree, App.WrappedComponent);
    let component = TestUtils.findRenderedComponentWithType(tree, Tooltip.WrappedComponent);
    tooltip = component.refs.tooltip;
    component = TestUtils.findRenderedComponentWithType(tree, Origin.WrappedComponent);
    origin = component.refs.wrapper;

    // Setup fake timer
    clock = new sinon.useFakeTimers();
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(document.getElementById('container'));

    // Take back real timer
    clock.restore();
  });

  describe('basic usage', () => {
    it('should be worked', () => {
      // Mouse Enter
      TestUtils.Simulate.mouseEnter(origin);

      style.cssText = tooltip.getAttribute('style');
      assert(style.getPropertyValue('visibility') === 'visible');

      // Mouse Leave
      TestUtils.Simulate.mouseLeave(origin);
      style.cssText = tooltip.getAttribute('style');
      assert(style.getPropertyValue('visibility') === 'visible', 'tooltip should be stil shown');

      // A bit later
      clock.tick(500);

      style.cssText = tooltip.getAttribute('style');
      assert(style.getPropertyValue('visibility') === 'visible');

      // Wait more
      clock.tick(1200);

      style.cssText = tooltip.getAttribute('style');
      assert(style.getPropertyValue('visibility') === 'hidden', 'tooltip should be hidden');
    });
  });
});
