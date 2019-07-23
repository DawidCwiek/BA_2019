import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ConfirmationAdmin from "./accepted_modal";

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users_data: [],
      admin: []
    };
  }

  userDataTaker = () => {
    axios
      .get("users_list.json", {
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
            .content
        }
      })
      .then(response => {
        this.setState({ users_data: response.data.data });
      });
  };

  superAdminTaker = () => {
    axios
      .get("api/v1/users.json", {
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
            .content
        }
      })
      .then(response => {
        this.setState({ admin: response.data });
      });
  };

  showUsers = () => {
    return this.state.users_data.map(userData => (
      <li key={userData.id}> {userData.full_name}</li>
    ));
  };

  ShowSuperAdmin = () => {
    return this.state.admin.map(superAdmin => (
      <li key={superAdmin.id}> {superAdmin.full_name}</li>
    ));
  };

  componentDidMount() {
    this.userDataTaker();
    this.superAdminTaker();
  }

  render() {
    return (
      <>
        {this.state.users_data.map(userData => (
          <tr key={userData.id}>
            <th>{userData.id}</th> <td>{userData.full_name}</td>
            <td>{userData.email}</td>
            <td>{String(userData.admin)}</td>
            <td>
              {this.state.admin ? (
                <ConfirmationAdmin
                  user_id={userData.id}
                  user_data={this.userDataTaker}
                />
              ) : null}
            </td>
          </tr>
        ))}
      </>
    );
  }
}

export default UsersList;

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<UsersList />, document.getElementById("tbody"));
});
// json and data saving lerned from this site: https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
