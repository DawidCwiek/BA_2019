import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, 
  FormText,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem  } from "reactstrap";

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      dropdownOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggle_drop = this.toggle_drop.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  toggle_drop() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
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
          toggle_drop={this.toggle_drop}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Create Task</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="taskTitle">Title</Label>
                <Input type="text" minLength="3" maxLength="30" name="text" id="taskTitle" placeholder="write task title" />

            </FormGroup>
            <FormGroup>
                 <Label for="exampleText">Description</Label>
                 <Input type="textarea" maxLength="160" name="text" id="task description" placeholder="write disc" />
            </FormGroup>
            <FormGroup>
            <Label for="exampleText">Users to assign</Label>
            </FormGroup>
            <FormGroup>
              <ButtonDropdown isOpen={this.state.dropdownOpen} toggle_drop={this.toggle_drop}>
                <DropdownToggle caret>
                  List of Users
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem disabled>Action</DropdownItem>
                  <DropdownItem>Another Action</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Another Action</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
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
