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
			},
			errors: {}
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
		if(this.handleValidation()){

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
	      ).catch(e => {
					if(e.response.data.errors["key"] !== "undefined"){
						this.setState({errors: {key: "The key must be unique"}});
					}

				})
		};
	};

		handleValidation(){
        let project = this.state.data;
        let errors = {};
        let formIsValid = true;

        //title
        if(!project.title){
           formIsValid = false;
           errors["title"] = "Cannot be empty";
        }else{
           if(project.title.length > 30){
              formIsValid = false;
              errors.title = "Must have less than 30 characters";
           }
        }

				//desc
        if(!project.desc){
           formIsValid = false;
           errors.desc = "Cannot be empty";
        } else {
           if(project.desc.length > 160){
              formIsValid = false;
              errors.desc = "Must have less than 160 characters";
           }
        }

				//key
        if(!project.key){
           formIsValid = false;
           errors.key = "Cannot be empty";
        } else {
           if(project.key.length > 3){
              formIsValid = false;
              errors.key = "Must have less than 3 characters";
           }
        }

       this.setState({errors: errors});
       return formIsValid;
   }


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
								<span style={{color: "red"}}>{this.state.errors["title"]}</span>
			        </FormGroup>
							<FormGroup>
			          <Label for="desc" className="text-muted" >Description</Label>
			            <Input type="textarea" name="desc" id="desc" placeholder="Description" value={this.state.data.desc} onChange={e => { this.setFromValue('desc', e.target.value) }}/>
									<span style={{color: "red"}}>{this.state.errors["desc"]}</span>
							</FormGroup>
							<FormGroup>
			          <Label for="key" className="text-muted">Key</Label>
			          <Input type="text" name="key" id="key" placeholder="Key" value={this.state.data.key} onChange={e => { this.setFromValue('key', e.target.value) }}/>
								<span style={{color: "red"}}>{this.state.errors["key"]}</span>
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
    document.getElementById('project-form-modal')
  );
});
