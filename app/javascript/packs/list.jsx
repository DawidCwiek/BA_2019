import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { ListGroup, ListGroupItem } from "reactstrap";

class List extends React.Component {
  state = {
    projects: []
  };

  projectData = () => {
     axios
      .get(
        "/projects.json",
      {
          headers: {
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
              .content
          }
        })
        .then(response => {
        this.setState({ projects: response.data.data });
        console.log(response.data.data);
      });
  };

  numberList = () => {
    const projects = this.state.projects;
    const projectsList = projects.map(project => (
      <ListGroupItem key={project.id} tag="a" href="#">
        [{project.key}] {project.title}
      </ListGroupItem>
    ));
    <h2 class="sign-up-header">Users list</h2>;
    return <table className="table striped-list">{projectsList}</table>;
  };

  componentDidMount() {
    this.projectData();
  }

  render() {
    return <div>{this.numberList()}</div>;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<List />, document.getElementById("list"));
});
