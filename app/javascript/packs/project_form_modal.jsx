import React from 'react';
import ReactDOM from "react-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from "axios";

class ProjectFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
			data: {
				title: "",
				desc: "",
				key: ""
			}
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

	setFromValue = (attribute, value) => {
		this.setState(prev => ({ data: {...prev.data, [attribute]: value} }))
	}


	handleSubmit = e => {
	    this.setState({
	      data: {
					title: "",
					desc: "",
					key: ""
				}
	    });
	    e.preventDefault();

	    axios
	      .post(
	        "project.json",
	        { project: this.state.data },
	        {
	          headers: {
	            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
	              .content
	          }
	        }
	      )
			console.log("Hello world!");
	  };

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>Create New Project</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} className="text-muted">Create New Project</ModalHeader>
					<Form onSubmit={this.handleSubmit}>
						<ModalBody>

							<FormGroup>
			          <Label for="title" className="text-muted">Title</Label>
			          <Input type="text" name="title" id="title" placeholder="Title" value={this.state.data.title} onChange={e => { this.setFromValue('title', e.target.value) }}/>
			        </FormGroup>
							<FormGroup>
			          <Label for="desc" className="text-muted" >Description</Label>
			            <Input type="textarea" name="desc" id="desc" placeholder="Description" value={this.state.data.desc} onChange={e => { this.setFromValue('desc', e.target.value) }}/>
			        </FormGroup>
							<FormGroup>
			          <Label for="key" className="text-muted">Key</Label>
			          <Input type="text" name="key" id="key" placeholder="Key" value={this.state.data.key} onChange={e => { this.setFromValue('key', e.target.value) }}/>
			        </FormGroup>

						</ModalBody>
	          <ModalFooter>
	            <Button color="primary" onClick={this.handleSubmit}>Save</Button>{' '}
	            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
	          </ModalFooter>
					</Form>
        </Modal>
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ProjectFormModal />,
    document.body.appendChild(document.createElement("div"))
  );
});
