import React from "react";
import ReactDOM from "react-dom";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import axios from "axios";

export default class ColumnFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      data: {
        name: this.props.column.name,
        projectId: this.props.projectId.id,
      },
      errors: {}
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  setFromValue = (attribute, value) => {
    this.setState(prev => ({ data: { ...prev.data, [attribute]: value } }));
  };
  handleSubmit = e => {
    if (this.handleValidation()) {
      axios
        .patch(
          `/projects/${this.state.data.projectId}/columns/${this.props.column.id}`,
          { column: this.state.data },
          {
            headers: {
              "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
                .content
            }
          }
        )
    }
  };
  handleValidation() {
    let column = this.state.data;
    let errors = {};
    let formIsValid = true;
    //title
    if (!column.name) {
      formIsValid = false;
      errors.name = "Cannot be empty";
    } else {
      if (column.name.length > 30) {
        formIsValid = false;
        errors.name = "Must have less than 30 characters";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }
  render() {
    return (
      <>
        <a onClick={this.toggle} >
          ...
        </a>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} className="text-muted">
            Edit Column
          </ModalHeader>
          <Form onSubmit={this.handleSubmit}>
            <ModalBody>
              <FormGroup>
                <Label for="name" className="text-muted">
                  Name
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  value={this.state.data.name}
                  onChange={e => {
                    this.setFromValue("name", e.target.value);
                  }}
                />
                <span style={{ color: "red" }}>
                  {this.state.errors["name"]}
                </span>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => {
                (this.handleSubmit(),
                this.toggle())}} >
                Save
              </Button>{" "}
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </>
    );
  }
}
