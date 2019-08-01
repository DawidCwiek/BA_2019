import React from "react";
import axios from "axios";
import ConfirmationAdmin from "./accepted_modal";
import RemoveAdmin from "./remove_admin";
import ArchiveUserModal from "./archive_user_modal";
import { ListGroup, ListGroupItem } from "reactstrap";

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users_data: [],
      admin: [],
      user_admin: [],
      value: "",
      activeUser: "",
      suggestions: [],
      user_archived: []
    };
  }

  getSuggestions = value => {
    if (!value) {
      return null;
    }
    const { users_data } = this.state;
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === "") {
      return [];
    }

    const regex = new RegExp(escapedValue + "+", "i");
    return users_data.filter(user => regex.test(user.full_name));
  };

  escapeRegexCharacters = str => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  userDataTaker = () => {
    axios
      .get("users_list.json", {
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
            .content
        }
      })
      .then(response => {
        const data = response.data.data.filter(user => {
          return user.active === true && user.super_admin === null;
        });
        this.setState({
          users_data: data
        });
      });
  };

  UserAdminTaker = () => {
    axios
      .get("users_list.json", {
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
            .content
        }
      })
      .then(response => {
        const user = response.data.admin;
        this.setState({
          user_admin: user
        });
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

  onSuggestionsFetchRequested = e => {
    const value = e.target.value;
    this.setState({
      suggestions: value.length > 0 ? this.getSuggestions(value) : []
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  renderUsers = () => {
    this.state.users_data.sort((a, b) => {
      if (a.archived < b.archived) {
        return -1;
      } else {
        return 1;
      }
    });

    const { users_data, suggestions } = this.state;

    const newUsersData = suggestions.length > 0 ? suggestions : users_data;

    return newUsersData.map((userData, index) =>
      userData.archived ? (
        <tr key={userData.id} className="archived">
          <th>{index + 1}</th>
          <td>{userData.full_name}</td>
          <td>{userData.email}</td>
          <td>{""}</td>
        </tr>
      ) : (
        <tr key={userData.id}>
          <th className="vert-align-mid">{index + 1}</th>
          <td className="vert-align-mid">{userData.full_name}</td>
          <td className="vert-align-mid">{userData.email}</td>
          <td className="vert-align-mid">
            {this.state.admin ? (
              userData.admin ? (
                <RemoveAdmin
                  user_id={userData.id}
                  user_data={this.userDataTaker}
                />
              ) : (
                <ConfirmationAdmin
                  user_id={userData.id}
                  user_data={this.userDataTaker}
                />
              )
            ) : null}

            <div className="margin">
              <ArchiveUserModal
                userId={userData.id}
                user_data={this.userDataTaker}
              />
            </div>
          </td>
        </tr>
      )
    );
  };

  componentDidMount() {
    this.userDataTaker();
    this.superAdminTaker();
  }

  render() {
    return (
      <>
        <input
          type="text"
          className="form-control fas fa-search"
          placeholder="Search..."
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={this.onSuggestionsFetchRequested}
        />
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Full Name</th>
              <th scope="col">Email</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody id="tbody">{this.renderUsers()}</tbody>
        </table>
      </>
    );
  }
}

export default UsersList;
