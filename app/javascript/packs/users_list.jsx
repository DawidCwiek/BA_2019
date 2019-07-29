import React from "react";
import axios from "axios";
import ConfirmationAdmin from "./accepted_modal";
import RemoveAdmin from "./remove_admin";
import Autosuggest from "react-autosuggest";

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSuggestionValue(suggestion) {
  return suggestion.full_name;
}

function renderSuggestion(suggestion) {
  return suggestion.full_name;
}

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users_data: [],
      admin: [],
      user_admin: [],
      value: "",
      activeUser: "",
      suggestions: []
    };
  }

  getSuggestions = value => {
    const suggestions = this.state.users_data.map(item => {
      return { full_name: item.full_name };
    });
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === "") {
      return [];
    }

    const regex = new RegExp("^" + escapedValue, "i");

    return suggestions.filter(suggestions => regex.test(suggestions.full_name));
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

  onKeyDown = event => {
    if (event.keyCode === 13) {
      const innerText = event.currentTarget.value;
      this.setState({
        activeUser: innerText,
        value: innerText
      });
    }
  };

  onChange = (event, { newValue, method }) => {
    if (method === "click") {
      const innerText = event.currentTarget.innerText;

      this.setState({
        activeUser: innerText,
        value: innerText
      });
    } else {
      this.setState({
        value: newValue,
        activeUser: ""
      });
    }
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  renderUsers = () => {
    const { activeUser, users_data } = this.state;

    const escapedValue = escapeRegexCharacters(activeUser.trim());

    const regex = new RegExp("^" + escapedValue, "i");

    const newUsersData = users_data.filter(user => regex.test(user.full_name));

    return newUsersData.map((userData, index) => (
      <tr key={userData.id}>
        <th>{index + 1}</th>
        <td>{userData.full_name}</td>
        <td>{userData.email}</td>
        <td>
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
        </td>
      </tr>
    ));
  };

  componentDidMount() {
    this.userDataTaker();
    this.superAdminTaker();
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search...",
      value,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown
    };

    return (
      <>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
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
