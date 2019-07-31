import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { ListGroup, ListGroupItem } from 'reactstrap';
import ActivateUserModal from './activate_user_modal'

class NoActiveUsersList extends React.Component {
  state = {
    users: [],
  };



  usersData = () => {
     axios
      .get(
        "/users_list.json",
      {
          headers: {
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
              .content
          }
        })
        .then(response => {
        this.setState({ users: response.data.data });
      });
    }

  numberList = () => {
    this.state.users.sort((a,b) => {
      if (a.confirmed_at > b.confirmed_at) {
        return -1
      } else {
        return 1
      }
    })

    const users = this.state.users.filter((user) => { return user.active != true && user.archived != true });
    const usersList = users.map((user) => {
      return (
        <ListGroupItem key={user.id} >
          <div className="aligning-items">
            {user.full_name}
            <div className="activate-modal">
             { <ActivateUserModal userId={user.id} usersData={this.usersData} /> }
             </div>
           </div>

        </ListGroupItem>
      )}

    );
    return (
      <ListGroup className="striped-list">{usersList}</ListGroup>
    );
  }


  componentDidMount() {
    this.usersData();
  }

  render() {
    return <div>{this.numberList()}</div>;
  }
}

export default NoActiveUsersList;

// document.addEventListener("DOMContentLoaded", () => {
//   ReactDOM.render(<NoActiveUsersList />, document.getElementById("user_no_active"));
// });
