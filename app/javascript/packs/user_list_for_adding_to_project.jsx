import React from "react";
import axios from "axios";
import Autosuggest from "react-autosuggest";
import AddUserToProjectButton from './add_user_to_project_button';

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSuggestionValue(suggestion) {
  return suggestion.full_name;
}

function renderSuggestion(suggestion) {
  return suggestion.full_name;
}

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

export default UsersListForAdding;
