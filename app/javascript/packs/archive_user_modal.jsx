import React from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export class ArchiveUserModal extends React.Component {
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
      this.archiveUser()
    );
  };

  archiveUser = () => {
    axios
      .patch(
        `users/archive/${this.props.userId}`,
        {},
        {
          headers: {
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
              .content
          }
        }
      )
      .then(() => {
        this.props.user_data();
      });
  };

  render() {
    return (
      <div className="center">
        <Button onClick={this.toggle} className="btn btn-danger">
          Archive
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Archive user</ModalHeader>
          <ModalBody>Are you sure you want to archive this user?</ModalBody>
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

export default ArchiveUserModal;
