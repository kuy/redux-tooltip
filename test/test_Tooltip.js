import assert from 'power-assert';
import React, { Component, PropTypes } from 'react';
import TestUtils from 'react-addons-test-utils';
import { Tooltip } from '../src/index';

describe('Tooltip', () => {
  const NakedTooltip = Tooltip.WrappedComponent;

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
          <NakedTooltip {...this.state}>
            Hello Redux!
          </NakedTooltip>
        </div>
      );
    }
  }

  let page;
  beforeEach(() => {
    page = TestUtils.renderIntoDocument(<Page />);
  });

  it('should be hidden by default', () => {
    const component = TestUtils.findRenderedComponentWithType(page, NakedTooltip);
    const tooltip = component.refs.tooltip;
    assert(tooltip._style.getPropertyValue('visibility') === 'hidden');

    const content = component.refs.content;
    assert(content.innerHTML === 'Hello Redux!')
  });

  it('should be shown', () => {
    page.setState({ el: page.refs.origin, show: true });
    const component = TestUtils.findRenderedComponentWithType(page, NakedTooltip);
    const tooltip = component.refs.tooltip;
    assert(tooltip._style.getPropertyValue('visibility') === 'visible');
  });

  it('should have content from props', () => {
    page.setState({ content: 'Hello Tooltip!' });
    const component = TestUtils.findRenderedComponentWithType(page, NakedTooltip);
    const content = component.refs.content;
    assert(content.innerHTML === 'Hello Tooltip!')
  });
});
