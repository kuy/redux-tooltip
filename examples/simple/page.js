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

        <p>
          <Origin>
            <img src="http://lorempixel.com/image_output/cats-q-g-240-180-9.jpg" alt="cat" />
          </Origin>
          <br />
          It can be used as a caption of images.
        </p>

        <p>
          Form hint: <br />
          <Origin>
            <input type="input" placeholder="mail" />
          </Origin>@<Origin>
            <input type="input" placeholder="example.com" />
          </Origin>
        </p>

        <p>
          Choose tooltip placement from: <Origin className="target" place="top">Top</Origin>, <Origin className="target" place="right">Right</Origin>, <Origin className="target" place="bottom">Bottom</Origin>, and <Origin className="target" place="left">Left</Origin>.
        </p>
      </div>
    );
  }
}
