import React from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export class ConfirmationModal extends React.Component {
  state = {
    modal: false,
    archived: false
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  handleClick = () => {
    this.setState(
      {
        archived: true
      },
      this.archiveProject
    );
  };

  archiveProject = () => {
    axios
      .patch(
        `projects/archive/${this.props.projectId}`,
        {},
        {
          headers: {
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
              .content
          }
        }
      )
      .then(() => {
        this.props.projectData();
      });
  };

  render() {
    return (
      <div>
        <Button onClick={this.toggle} className="btn btn-danger">
          Archive
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
              onClick={() => {
                this.toggle(), this.handleClick();
              }}
              color="primary"
              className="archive-button"
              rel="nofollow"
            >
              Archive
            </Button>
            {""}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ConfirmationModal;
