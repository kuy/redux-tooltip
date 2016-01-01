import assert from 'power-assert';
import React, { Component, PropTypes } from 'react';
import TestUtils from 'react-addons-test-utils';
import { Tooltip as ConnectedTooltip } from '../src/index';

const Tooltip = ConnectedTooltip.WrappedComponent;

describe('Tooltip', () => {
  class Page extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return (
        <div>
          <p>
            This is a <span ref="origin">origin</span> element.
          </p>
          <Tooltip {...this.state}>
            Hello Redux!
          </Tooltip>
        </div>
      );
    }
  }

  let page, component, tooltip, content;
  beforeEach(() => {
    page = TestUtils.renderIntoDocument(<Page />);
    component = TestUtils.findRenderedComponentWithType(page, Tooltip);
    tooltip = component.refs.tooltip;
    content = component.refs.content;
  });

  it('should be hidden by default', () => {
    assert(tooltip._style.getPropertyValue('visibility') === 'hidden');
    assert(content.innerHTML === 'Hello Redux!');
  });

  it('should be shown', () => {
    assert(tooltip._style.getPropertyValue('visibility') === 'hidden');
    page.setState({ el: page.refs.origin, show: true });
    assert(tooltip._style.getPropertyValue('visibility') === 'visible');
  });

  it('should have content from props', () => {
    assert(content.innerHTML === 'Hello Redux!');

    page.setState({ content: 'Hello Tooltip!' });
    assert(content.innerHTML === 'Hello Tooltip!');

    page.setState({ content: 'Goodbye Tooltip!' });
    assert(content.innerHTML === 'Goodbye Tooltip!');

    page.setState({ content: null });
    assert(content.innerHTML === 'Hello Redux!');
  });

  it('should be placed in the given direction', () => {
    // Right
    page.setState({ el: page.refs.origin, show: true, place: 'right' });
    let border = component.refs.border;
    assert(border._style.getPropertyValue('border-top') === '9px solid transparent');
    assert(border._style.getPropertyValue('border-right') === '9px solid');

    // Bottom
    page.setState({ place: 'bottom' });
    border = component.refs.border;
    assert(border._style.getPropertyValue('border-left') === '9px solid transparent');
    assert(border._style.getPropertyValue('border-bottom') === '9px solid');

    // Left
    page.setState({ place: 'left' });
    border = component.refs.border;
    assert(border._style.getPropertyValue('border-top') === '9px solid transparent');
    assert(border._style.getPropertyValue('border-left') === '9px solid');

    // Top
    page.setState({ place: 'top' });
    border = component.refs.border;
    assert(border._style.getPropertyValue('border-left') === '9px solid transparent');
    assert(border._style.getPropertyValue('border-top') === '9px solid');
  });
});
