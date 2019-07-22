const languages = [
  { full_name: "Damian Gronowski" },
  {
    full_name: "Ciasny Wiesiek"
  },
  {
    full_name: "Michał Chudzi"
  }
];

import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Autosuggest from "react-autosuggest";

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === "") {
    return [];
  }

  const regex = new RegExp("^" + escapedValue, "i");

  return languages.filter(users_data => regex.test(users_data.full_name));
}

function getSuggestionValue(suggestion) {
  return suggestion.full_name;
}

function renderSuggestion(suggestion) {
  return <span>{suggestion.full_name}</span>;
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      value: "",
      suggestions: [],
      user_data: []
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

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search...",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
