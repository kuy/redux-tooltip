import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tooltip, Origin, actions } from '../../src/index';

const { show, content } = actions;

function now() {
  const now = new Date();
  return now.toString();
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { count: [] };
    setInterval(() => {
      let { count } = this.state;
      if (3 < count.length) {
        count = [];
      }
      count = [ ...count, 3 - count.length ];
      this.setState({ ...this.state, count });
    }, 1000);

    this.handleHover = this.handleHover.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
  }

  handleHover() {
    this.updateContent();
    this.token = setInterval(() => {
      this.updateContent();
    }, 1000);
  }

  handleLeave() {
    clearInterval(this.token);
  }

  updateContent() {
    this.props.dispatch(content(now()));
  }

  render() {
    const dom = <div>
      <span style={{ color: 'red', marginRight: '5px' }}>Red</span>
      <span style={{ color: 'green', marginRight: '5px' }}>Green</span>
      <span style={{ color: 'blue', marginRight: '5px' }}>Blue</span>
    </div>;

    const { count } = this.state;
    const countBody = count.join(', ');

    return (
      <div>
        <h1>Content Example</h1>

        <p>
          If you provide a <Origin className="target custom" content="This is a custom content.">custom</Origin> content via Origin component's prop,
          it will overwrite a <Origin className="target default">default</Origin> content of Tooltip component.<br />
          <Origin className="target html" content="This is a <b>html</b> content.<br />Sanitized by <a href='#'>DOMPurify</a>.<script>console.log('Hello XSS!');</script>">HTML</Origin> as string and <Origin className="target dom" content={dom}>DOM element</Origin> are also supported.
        </p>

        <p>
          What time is it <Origin className="target time" onHover={this.handleHover} onLeave={this.handleLeave}>now</Origin>?
        </p>

        <p>
          Count down: <Origin name="count" className="target count">Here</Origin>
        </p>

        <Tooltip>
          This is a default content.<br />
          It's a second line.
        </Tooltip>

        <Tooltip name="count">{countBody}</Tooltip>
      </div>
    );
  }
}

function select(state) {
  const { app } = state;
  return { app };
}

export default connect(select)(App);
