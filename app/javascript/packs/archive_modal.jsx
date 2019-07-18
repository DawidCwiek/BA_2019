import React from "react";
import ReactDOM from "react-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>
          {this.props.buttonLabel}
          Archivise
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Archive project?</ModalHeader>
          <ModalBody>Are you sure you want to archive this project?</ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={this.toggle}
              className="archive-button"
            >
              <a
                rel="nofollow"
                data-method="get"
                href={`/project/archive/${this.props.projectId}`}
                className="archive-button"
              >
                Confirm
              </a>
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(
  <ConfirmationModal />,
  document.getElementById("archive-confirm")
);
