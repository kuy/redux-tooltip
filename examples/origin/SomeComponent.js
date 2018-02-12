import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


class SomeComponent extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    console.log("__onClick__");
  }

  render() {
    console.log("this.props: ", this.props);
    return (
      <a {...this.props} onClick={this.onClick} className="SomeComponent">
        {this.props.children}
      </a>
    );
  }
}

export default SomeComponent;
