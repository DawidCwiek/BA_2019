import React from "react";
import axios from "axios";
import AddUserToProjectButton from './add_user_to_project_button';

export class UsersListForAdding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users_data: [],
      value: "",
      activeUser: "",
      suggestions: []
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
      .get(`/api/v1/not_assigned_users/${this.props.project.project.id}`, {
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
            .content
        }
      })
      .then(response => {
        const data = response.data.filter((user) => { return user.active === true });;
        this.setState({
          users_data: data
        });
      });
  };

  showUsers = () => {
    return this.state.users_data.map(userData => (
      <li key={userData.id}> {userData.full_name}</li>
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
    const { users_data, suggestions } = this.state;

    const newUsersData = suggestions.length > 0 ? suggestions : users_data;

    return newUsersData.map((userData, index) => (
      <tr key={userData.id}>
        <td>{userData.full_name}</td>
        <td>{userData.email}</td>
        <td><AddUserToProjectButton userId={userData.id} projectId={this.props.project}/></td>
      </tr>
    ));
  };

  componentDidMount() {
    this.userDataTaker();
  }

  render() {
    return (
      <>
        <div className="searchbar-config">
        <input
          type="text"
          className="form-control fas fa-search"
          placeholder="Search..."
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={this.onSuggestionsFetchRequested}
        />
        </div>
        <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Full Name</th>
              <th scope="col">Email</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody id="tbody">{this.renderUsers()}</tbody>
        </table>
        </div>
      </>
    );
  }
}

export default UsersListForAdding;
