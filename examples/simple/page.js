import React, { Component, PropTypes } from 'react';
import { Origin } from '../../src/index';

export default class Page extends Component {
  render() {
    return (
      <div>
        <p>
          This is an example for redux-tooltip.<br />
          You can put a tooltip on <Origin className="target">a text</Origin>.
        </p>

        <p>
          Of course, you can also put <Origin className="target">multiple</Origin> <Origin className="target">tooltips</Origin>.
        </p>
      </div>
    );
  }
}
