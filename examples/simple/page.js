import React, { Component, PropTypes } from 'react';
import { Origin } from '../../src/index';

const PIXEL = 'data:image/gif;base64,R0lGODlhAQABAPAAAAD/AP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';

const SVGOrigin = Origin.wrapBy('g');

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

        <p>
          <svg width="240" height="70">
            <g transform="translate(40, 10)">
              <SVGOrigin className="red">
                <rect fill="red" x="0" y="0" width="50" height="50" />
              </SVGOrigin>
              <SVGOrigin className="green">
                <circle fill="green" cx="85" cy="25" r="25" />
              </SVGOrigin>
              <g transform="translate(120, 0)">
                <rect fill="blue" x="0" y="0" width="50" height="50" />
                <g transform="translate(15, 15)">
                  <SVGOrigin className="blue">
                    <rect fill="lightblue" x="0" y="0" width="20" height="20" />
                  </SVGOrigin>
                </g>
              </g>
            </g>
          </svg>
        </p>
      </div>
    );
  }
}
