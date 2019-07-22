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

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <a onClick={this.toggle} className="archive-modal">x</a>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Archive project?</ModalHeader>
          <ModalBody>Are you sure you want to archive this project?</ModalBody>
          <ModalFooter>
            <Button
              onClick={this.toggle}
              color="primary"
              className="archive-button"
              rel="nofollow"
            >
              <a className="archive-link" href={`/project/archive/${this.props.projectId}`}>Archive</a>
            </Button>
            {""}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };
}

export default ConfirmationModal;

