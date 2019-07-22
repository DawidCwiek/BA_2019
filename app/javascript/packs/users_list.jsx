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

  // handleSubmit = e => {
  //         this.setState({
  //         data: {
  //           title: "",
  //           desc: "",
  //           user_id: "",
  //           project_id: 1
  //         }

  //       });

  //       if(this.handleValidation()){
  //       e.preventDefault();

  //       this.setState(prevState => ({
  //         modal: !prevState.modal,
  //       }));

  //   axios
  //     .post(
  //       "task.json",
  //       { task: this.state.data },
  //     {
  //         headers: {
  //           "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
  //             .content
  //         }
  //       }
  //     )
  //     .catch(e => {
  // 				if(e.response.data.errors["key"] !== "undefined"){
  // 					this.setState({errors: {key: "The key must be unique"}});
  // 				}
  // 			})
  //   }
  // }

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
      <tr>
        <th className="Id">
          {this.state.users_data.map(userData => (
            <div key={userData.id}> {userData.id}</div>
          ))}
        </th>
        <td className="Full_Name">
          {this.state.users_data.map(userData => (
            <div key={userData.id}> {userData.full_name}</div>
          ))}
        </td>
        <td className="Email">
          {this.state.users_data.map(userData => (
            <div key={userData.id}> {userData.email}</div>
          ))}
        </td>
        <td className="IsAdmin">
          {this.state.users_data.map(userData => (
            <div key={userData.id}> {userData.admin}</div>
          ))}
        </td>
      </tr>
    );
  }
}

export default UsersList;

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<UsersList />, document.getElementById("tbody"));
});
// json and data saving lerned from this site: https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
