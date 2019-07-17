import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import PropTypes from "prop-types";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, 
  FormText,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem  } from "reactstrap";

class Task_form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      dropdownOpen: false,
      data: {
        title: "",
        desc: "",
        user_id: "",
        project_id: ""
			}
    };

    this.toggle = this.toggle.bind(this);
    this.toggle_drop = this.toggle_drop.bind(this);
  }

  setFromValue = (attribute, value) => {
		this.setState(prev => ({ data: {...prev.data, [attribute]: value} }))
	}


	handleSubmit = e => {
	    this.setState({
	      data: {
					title: "",
					desc: "",
          user_id: "",
          project_id: ""
				}
	    });
	    e.preventDefault();

  axios
	      .post(
	        "task.json",
	        { task: this.state.data },
	        {
	          headers: {
	            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
	              .content
	          }
	        }
	      )
	  };




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
            <Form>
              <FormGroup>
                <Label className="text-muted" for="title">Title</Label>
                <Input type="text" minLength="3" maxLength="30" name="title" id="title" placeholder="Write task title" 
                value={this.state.data.title} onChange={e => { this.setFromValue('title', e.target.value) } }/>
            </FormGroup>
            <FormGroup>
                 <Label className="text-muted" for="exampleText">Description</Label>
                 <Input type="textarea" maxLength="160" name="desc" id="desc" placeholder="Write discription"
                 value={this.state.data.desc} onChange={e => { this.setFromValue('desc', e.target.value) } } />
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
      </div>
    );
  }
}

export default Task_form;

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Task_form/>,
    document.body.appendChild(document.createElement("div"))
  );
});
// json and data saving lerned from this site: https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
