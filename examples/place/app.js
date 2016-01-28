import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, Origin } from '../../src/index';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Place Example</h1>

        <h2>Using origin's prop</h2>
        <p>
          Available 4 directions: <Origin className="target" place="top">Top</Origin>, <Origin className="target" place="right">Right</Origin>, <Origin className="target" place="bottom">Bottom</Origin>, and <Origin className="target" place="left">Left</Origin>.
        </p>

        <Tooltip>
          This is a <b>shared</b> tooltip.
        </Tooltip>

        <h2>Using tooltip's prop</h2>
        <p>
          Available 4 directions: <Origin className="target" name="top">Top</Origin>, <Origin className="target" name="right">Right</Origin>, <Origin className="target" name="bottom">Bottom</Origin>, and <Origin className="target" name="left">Left</Origin>.
        </p>

        <Tooltip name="top" place="top">
          This is a <b>top</b> tooltip.
        </Tooltip>
        <Tooltip name="right" place="right">
          This is a <b>right</b> tooltip.
        </Tooltip>
        <Tooltip name="bottom" place="bottom">
          This is a <b>bottom</b> tooltip.
        </Tooltip>
        <Tooltip name="left" place="left">
          This is a <b>left</b> tooltip.
        </Tooltip>

        <h2>Auto placement</h2>
        <p>
          <Origin className="target auto-basic" place="left">This tooltip</Origin> is configured to be placed <b>left</b> of the origin element, but no space to show.<br />
          Therefore, it will be located <b>right</b> instead of <b>left</b>.
        </p>

        <p>
          You can customize <Origin className="target auto-array" place={['left', 'top']}>the order</Origin> of fallback.<br />
          The 'place' prop <Origin className="target auto-string" place="left,bottom">can</Origin> be also passed as a comma separated string.
        </p>

        <div ref="restricted" style={{ width: '360px', height: '160px', backgroundColor: 'lightgray', padding: '10px', position: 'relative' }}>
          In default, <Origin name="restricted" className="target auto-top" place="top">redux-tooltip</Origin> supposes you want to do auto-placement within the browser window.<br />
          Using <code>within</code> prop, you can specify <Origin name="restricted" className="target auto-right" place="right">DOM</Origin> element instead of BODY element.
          <div style={{ position: 'absolute', bottom: '10px' }}>
            This is a <Origin name="restricted" className="target auto-bottom" place="bottom">bottom</Origin> origin.
          </div>
        </div>

        <Tooltip name="restricted" within={() => this.refs.restricted}>
          This is a <b>restricted</b> tooltip.
        </Tooltip>

        <div ref="more" style={{ width: '348px', backgroundColor: 'lightgray', marginTop: '14px', padding: '16px' }}>
          Two or <Origin name="more" className="target auto-more" place={['left', 'top', 'bottom', 'right']}>more fallbacks</Origin> also works well.
        </div>

        <Tooltip name="more" within={() => this.refs.more}>
          This is a <b>more</b> tooltip.
        </Tooltip>

        <div ref="disabled" style={{ width: '348px', backgroundColor: 'lightgray', marginTop: '14px', padding: '16px' }}>
          The <Origin name="disabled" className="target auto-disabled" place="left">auto placement</Origin> feature can be disabled by passing <b>false</b> to <code>auto</code> prop.
        </div>

        <Tooltip name="disabled" auto={false} within={() => this.refs.disabled}>
          This is a <b>disabled</b> tooltip.
        </Tooltip>
      </div>
    );
  }
}

function select(state) {
  const { app } = state;
  return { app };
}

export default connect(select)(App);
