import React from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export class RemoveAdmin extends React.Component {
  state = {
    modal: false,
    admin: true
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  handleClick = () => {
    this.setState(
      {
        admin: false
      },
      this.RemoveAdmin
    );
  };

  RemoveAdmin = () => {
    axios
      .patch(
        `/administrators/remove_admin/${this.props.user_id}`,
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
      <div>
        <Button onClick={this.toggle} className="btn btn-warning">
          Remove
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Remove Admin?</ModalHeader>
          <ModalBody>Are you sure you want to remove admin?</ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                this.toggle(), this.handleClick();
              }}
              color="primary"
              className="archive-button"
              rel="nofollow"
            >
              Yes
            </Button>
            {""}
            <Button color="secondary" onClick={this.toggle}>
              No
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default RemoveAdmin;
