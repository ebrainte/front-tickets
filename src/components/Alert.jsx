import React from "react";

// reactstrap components
import { UncontrolledAlert } from "reactstrap";

class Alerts extends React.Component {
  render() {
    return (
      <>
        <UncontrolledAlert color={this.props.color} fade={false}>
          <span className="alert-inner--icon">
            <i className="ni ni-like-2" />
          </span>
          <span className="alert-inner--text ml-1">
            <strong>{this.props.textStrong}</strong> {this.props.text}
          </span>
        </UncontrolledAlert>
      </>
    );
  }
}

export default Alerts;
