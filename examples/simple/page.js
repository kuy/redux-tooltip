import React, { Component, PropTypes } from 'react';
import { Origin } from '../../src/index';

const PIXEL = 'data:image/gif;base64,R0lGODlhAQABAPAAAAD/AP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';

export default class Page extends Component {
  render() {
    return (
      <div>
        <p>
          This is an example for redux-tooltip.<br />
          You can put a tooltip on <Origin className="target">a text</Origin>.
        </p>

        <p>
          Of course, you can also put <Origin className="target first">multiple</Origin> <Origin className="target second">tooltips</Origin>.
        </p>

        <p>
          <Origin className="image">
            <img src={PIXEL} width="240" height="180" alt="placeholder" />
          </Origin>
          <br />
          It can be used as a caption of images.
        </p>

        <p>
          Form hint: <br />
          <Origin className="user">
            <input type="input" placeholder="mail" />
          </Origin>@<Origin className="domain">
            <input type="input" placeholder="example.com" />
          </Origin>
        </p>

        <p>
          Choose tooltip placement from: <Origin className="target top" place="top">Top</Origin>, <Origin className="target right" place="right">Right</Origin>, <Origin className="target bottom" place="bottom">Bottom</Origin>, and <Origin className="target left" place="left">Left</Origin>.
        </p>
      </div>
    );
  }
}
