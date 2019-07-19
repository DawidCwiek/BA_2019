import React from 'react';
import ReactDOM from "react-dom";
import axios from "axios";
import { ListGroup, ListGroupItem } from 'reactstrap';

class ListDawid extends React.Component {
  state = {
    projects: [],
  };


  projectData = () => {
     axios
      .get(
        "/project.json",
      {
          headers: {
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
              .content
          }
        })
        .then(response => {
        this.setState({ projects: response.data.data });
        console.log(response.data.data)
      });
    }

  numberList = () => {
    const projects = this.state.projects;
    const projectsList = projects.map((project) =>
      <ListGroupItem key={project.id} tag="a" href="#">[{project.key}] {project.title}</ListGroupItem>
    );
    return (
      <ListGroup className="striped-list">{projectsList}</ListGroup>
    );
  }


  componentDidMount() {
    this.projectData()
  }

  render() {
    return (
      <div>
        {this.numberList()}
      </div>
    );
  }
}


document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ListDawid />,
    document.getElementById("list")
  );
});
