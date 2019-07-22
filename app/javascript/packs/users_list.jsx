import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users_data: []
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

  showUsers = () => {
    return this.state.users_data.map(userData => (
      <li key={userData.id}> {userData.full_name}</li>
    ));
  };

  componentDidMount() {
    this.userDataTaker();
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
              <button className="btn btn-danger">Add Admin</button>
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
