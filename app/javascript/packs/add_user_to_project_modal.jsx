import React from "react";
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import UsersListForAdding from './user_list_for_adding_to_project';

export class UserToProjectModal extends React.Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  render() {
    return (
      <div>
        <Button onClick={this.toggle} className="btn btn-primary">
          +Add user
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Add user to project</ModalHeader>
          <ModalBody className="scrollable-user-list">
            <UsersListForAdding project={this.props}/>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('add-user-to-project')
  const data = JSON.parse(node.getAttribute('data'))
  ReactDOM.render(
    <UserToProjectModal project={data} />,
  document.getElementById('add-user-to-project'))
})
