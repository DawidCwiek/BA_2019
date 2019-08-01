import React from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export class DeleteUser extends React.Component {
  state = {
    modal: false,
    archive: false,
    workers: []
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  handleClick = () => {
    this.setState(
      {
        archive: true
      },
      this.archiveUser
    );
  };

  archiveUser = () => {
    axios.patch(
      `/projects/${this.props.ProjectId}/archive_user/${this.props.UserId}`,
      {},
      {
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
            .content
        }
      }
    );
  };

  render() {
    return (
      
      <div>
        <Button onClick={this.toggle} outline color="danger">
          Delete
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Delete user?</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this user from project?
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                this.toggle(), this.handleClick();
              }}
              color="primary"
              className="archive-button"
              rel="nofollow"
            >
              Delete
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

export default DeleteUser;
