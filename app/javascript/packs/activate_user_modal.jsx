import React from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export class ActivateUserModal extends React.Component {
  state = {
    modal: false,
    active: false
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  handleClick = () => {
    this.setState(
      {
        active: false
      },
      this.activateUser
    );
  };

  activateUser = () => {
    axios
      .patch(
        `/administrators/user/${this.props.userId}`,
        {},
        {
          headers: {
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
              .content
          }
        }
      )
      .then(() => {
        this.props.usersData();
      });
  };

  render() {
    return (
      <div>
        <Button onClick={this.toggle} className="btn btn-danger">
          Activate
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Activate user?</ModalHeader>
          <ModalBody>Are you sure you want to activate this user?</ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                this.toggle(), this.handleClick();
              }}
              color="primary"
              className="archive-button"
              rel="nofollow"
            >
              Activate
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

export default ActivateUserModal;
