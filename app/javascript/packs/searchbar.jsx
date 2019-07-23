import React from "react";
import axios from "axios";

export default class GetData extends React.Component {
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
          <div key={userData.id}>
            <div>{userData.id}{userData.full_name}</div>
          </div>
        ))}
      </>
    );
  }
}







