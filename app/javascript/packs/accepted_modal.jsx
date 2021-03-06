import React from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export class ConfirmationAdmin extends React.Component {
  state = {
    modal: false,
    admin: false
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  handleClick = () => {
    this.setState(
      {
        admin: true
      },
      this.addAdmin
    );
  };

  addAdmin = () => {
    axios
      .patch(
        `/administrators/add_admin/${this.props.user_id}`,
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
        <Button onClick={this.toggle} className="btn btn-danger add-admin ">
           Admin
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Add Admin?</ModalHeader>
          <ModalBody>
            Are you sure you want to add admin to this project?
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

export default ConfirmationAdmin;
