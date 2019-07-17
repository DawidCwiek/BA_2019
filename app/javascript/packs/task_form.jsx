import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import PropTypes from "prop-types";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, 
  FormText,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem  } from "reactstrap";

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      dropdownOpen: false,
    };

    this.toggle = this.toggle.bind(this);
    this.toggle_drop = this.toggle_drop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    // fetch('/task.json', {
    //   method: 'POST',
    //   body: data,
    // });
    this.setState({
      res: stringifyFormData(data),
    });

    axios
    .post(
      "/task.json",
      { post: { res: this.state.res } },
      {
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
            .content
        }
      }
    )
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
          className={this.props.className}
        >
          <ModalHeader className="text-muted" toggle={this.toggle}>Create Task</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label className="text-muted" for="title">Title</Label>
                <Input type="text" minLength="3" maxLength="30" name="title" id="title" placeholder="Write task title"  />
            </FormGroup>
            <FormGroup>
                 <Label className="text-muted" for="exampleText">Description</Label>
                 <Input type="textarea" maxLength="160" name="desc" id="desc" placeholder="Write discription" />
                 <Input type="text" maxLength="160" name="project_id" id="project_id"/>
            </FormGroup>
            <FormGroup>
            <Label className="text-muted" for="exampleText">Users to assign</Label>
            </FormGroup>
            <FormGroup>
              <ButtonDropdown 
              isOpen={this.state.dropdownOpen}
              toggle={this.toggle_drop}
              className={this.props.className}>
                <DropdownToggle  caret>
                  List of Users
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem disabled>Users available</DropdownItem>
                  <DropdownItem>Place for future users</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </FormGroup>
            <Button color="primary" >
              Confirm
            </Button>
            </Form>
          </ModalBody>
        </Modal>
         {this.state.res && (
        	<div className="res-block">
            <h3>Data to be sent:</h3>
            <pre>FormData {this.state.res}</pre>
        	</div>
        )}
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
// json and data saving lerned from this site: https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
function stringifyFormData(fd) {
  const data = {};
	for (let key of fd.keys()) {
  	data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 2);
}
