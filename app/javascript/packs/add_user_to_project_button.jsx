import React from "react";
import axios from "axios";
import { Button } from "reactstrap";

export class AddUserToProjectButton extends React.Component {
  state = {
    modal: false,
    btnColor: "primary",
    btnText: "Add",
    disabled: false
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  handleClick = () => {
      this.addToProject();
  };

  changeButton = () => {
    this.setState({
      btnColor: "success",
      btnText: "Success!",
      disabled: true
    })
  }

  addToProject = () => {
    axios
      .post(
        `/api/v1/assign_user`,
        {userId: this.props.userId,
        projectId: this.props.projectId.project.id},
        {
          headers: {
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
              .content
          }
        }
      )
  };

  render() {
    return (
      <div className= "center">
        <Button onClick={() => {
          this.toggle(),
          this.handleClick(),
          this.changeButton()
          }}
          disabled={this.state.disabled}
          className="btn btn-primary success-button" color={this.state.btnColor} >
          {this.state.btnText}
        </Button>
      </div>
    );
  }
}

export default AddUserToProjectButton;
