import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText  } from "reactstrap";

class ModalExample extends React.Component {
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
         Create Task{this.props.buttonLabel}
          </Button>
        <Modal
          isOpen={this.state.modal}
          modalTransition={{ timeout: 700 }}
          backdropTransition={{ timeout: 1300 }}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Create Task</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="write email" />

            </FormGroup>
            <FormGroup>
                 <Label for="exampleText">Description</Label>
                 <Input type="textarea" name="text" id="task description" placeholder="write disc" />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Assign to:</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="person assign" />
            </FormGroup>
            </Form>
            <Button color="primary" onClick={this.toggle}>
              Confirm
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ModalExample/>,
    document.body.appendChild(document.createElement("div"))
  );
});
