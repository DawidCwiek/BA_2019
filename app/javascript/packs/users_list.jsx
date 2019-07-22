import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";


import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input
  ,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem  } from "reactstrap";




class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users_data: [],
    };


  }
 
    // handleSubmit = e => {
    //         this.setState({
    //         data: {
    //           title: "",
    //           desc: "",
    //           user_id: "",
    //           project_id: 1
    //         }
            
    //       });
         
    //       if(this.handleValidation()){
    //       e.preventDefault();
          
    //       this.setState(prevState => ({
    //         modal: !prevState.modal,
    //       }));

    //   axios
    //     .post(
    //       "task.json",
    //       { task: this.state.data },
    //     {
    //         headers: {
    //           "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
    //             .content
    //         }
    //       }
    //     )
    //     .catch(e => {
	// 				if(e.response.data.errors["key"] !== "undefined"){
	// 					this.setState({errors: {key: "The key must be unique"}});
	// 				}
	// 			})
    //   }
    // }

    userDataTaker = () =>{
 
       axios
        .get(
          "users_list.json",
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
   <li key={userData.id}> {userData.full_name}
        </li>)
  }

  componentDidMount() {
    this.userDataTaker();
  }




  render() {
    return (
      <div>
         <div>{this.state.users_data.map(userData => <div key={userData.id}> {userData.full_name}</div>)}</div>
         <div>{this.state.users_data.map(userData => <div key={userData.id}> {userData.email}</div>)}</div>
         <div>{this.state.users_data.map(userData => <div key={userData.id}> {userData.admin}</div>)}</div>
         <div>{this.state.users_data.map(userData => <div key={userData.id}> {userData.id}</div>)}</div>
      </div>
    );
  }
}

export default UsersList;

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <UsersList />,
    document.getElementById('users_list'))
  
});
// json and data saving lerned from this site: https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
