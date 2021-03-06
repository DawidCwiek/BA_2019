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

class ColumnFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      data: {
        name: "",
        project_id: this.props.project.id,
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
        .post(
          `/projects/${this.state.data.project_id}/columns`,
          { column: this.state.data },
          {
            headers: {
              "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
                .content
            }
          }
        )
        .then(
          window.location.assign(`/manage_io/${this.state.data.project_id}`)
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
        <Button onClick={this.toggle} className="btn btn-primary add-column-button">
          +Add column
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} className="text-muted">
            Add Column
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

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('add-column')
  const data = JSON.parse(node.getAttribute('data'))
  ReactDOM.render(
    <ColumnFormModal project={data} />,
  document.getElementById('add-column'))
})
