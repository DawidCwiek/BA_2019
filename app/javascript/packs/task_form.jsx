import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";


import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input
  ,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem  } from "reactstrap";




class Task_Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      dropdownOpen: false,
      data: {
        title: "",
        desc: "",
        project_id: 1,
      },
      users_data: [],
      errors: {}
    };

    this.toggle = this.toggle.bind(this);
    this.toggle_drop = this.toggle_drop.bind(this);
  }
  handleValidation(){
    let project = this.state.data;
    let errors = {};
    let formIsValid = true;

    //title
    if(!project["title"]){
       formIsValid = false;
       errors["title"] = "Cannot be empty";
    }

    if(typeof project["title"] !== "undefined"){
       if(project["title"].length > 30){
          formIsValid = false;
          errors["title"] = "Must have less than 30 characters";
       }
      }
      this.setState({errors: errors});
      return formIsValid;
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
              project_id: 1
            }
            
          });
          if(this.handleValidation()){
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
        .catch(e => {
					if(e.response.data.errors["key"] !== "undefined"){
						this.setState({errors: {key: "The key must be unique"}});
					}
				})
      }
    }

    userDataTaker = () =>{
 
       axios
        .get(
          "/project/users.json",
        {
            headers: {
              "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
                .content
            }
          })
          .then(response => {
          this.setState({ users_data: response.data.data });
        });
      }

  showUsers=()=>{
    return this.state.users_data.map(userData => 
    <DropdownItem key={userData.id}>
        {userData.full_name}
     </DropdownItem>)
  }

  componentDidMount() {
    this.userDataTaker();
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
          <a onClick={this.toggle} className="link-hover a-styling">Create task</a>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}>
          <ModalHeader className="text-muted" toggle={this.toggle}>Create Task</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label className="text-muted" for="title">Title</Label>
                <Input type="text" minLength="3" maxLength="30" name="title" id="title" placeholder="Write task title" 
                value={this.state.data.title} onChange={e => { this.setFromValue('title', e.target.value) } }/>
                <span style={{color: "red"}}>{this.state.errors["title"]}</span>
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
                  {this.showUsers()}
                </DropdownMenu>
              </ButtonDropdown>
            </FormGroup>
            <Button color="primary" onClick={this.handleSubmit} toggle={this.toggle}>
              Confirm
            </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Task_Form;

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Task_Form />,
    document.getElementById('create-task-modal'))
  
});
// json and data saving lerned from this site: https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
