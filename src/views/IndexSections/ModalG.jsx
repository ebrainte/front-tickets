
import React from "react";
import {
  Button,
  Modal,
} from "reactstrap";

class ModalG extends React.Component {
  state = {};
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
  render() {
    return (
      <>
        <Button
          className="mt-4"
          color="primary"
          href="#pablo"
          onClick={() => this.toggleModal("info")}
        >
          {this.props.buttonName}
        </Button>
        <Modal
          className="modal-dialog-centered"
          isOpen={this.state.info}
          toggle={() => this.toggleModal("info")}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-default">
              {this.props.title} - {this.props.date}
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("info")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <p>
              {this.props.body}<br/>
              {this.props.location}
            </p>
          </div>
          <div className="modal-footer">
            <Button
              className="ml-auto"
              color="link"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("info")}
            >
              Cerrar
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

export default ModalG;
