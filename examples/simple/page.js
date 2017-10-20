import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
            <img src={PIXEL} width="240" height="120" alt="placeholder" />
          </Origin>
          <br />
          It can be used as a caption of images.
        </p>

        <p>
          <span>Email: </span>
          <Origin className="user">
            <input type="input" placeholder="mail" />
          </Origin> @ <Origin className="domain">
            <input type="input" placeholder="example.com" />
          </Origin>
        </p>
      </div>
    );
  }
}
