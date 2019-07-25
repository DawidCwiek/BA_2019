import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { ListGroup, ListGroupItem } from 'reactstrap';

class CurrentUserProjectsList extends React.Component {
  state = {
    projects: [],
  };

  projectData = () => {
     axios
      .get(
        "/api/v1/projects.json",
      {
          headers: {
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
              .content
          }
        })
        .then(response => {
        this.setState({ projects: response.data });
      });
    }

  numberList = () => {
    this.state.projects.sort((a,b) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1
      } else {
        return -1
      }
    })
    
    const projects = this.state.projects;
    const projectsList = projects.map((project) =>
      <ListGroupItem  className=" task-list-styling userdash-link" key={project.id} href="#">
        [{project.key}] {project.title}
      </ListGroupItem>

    );
    return (
      <ListGroup className="striped-list">{projectsList}</ListGroup>
    );
  }


  componentDidMount() {
    this.projectData();
  }

  render() {
    return <div className="label-info project-scroll">{this.numberList()}</div>;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<CurrentUserProjectsList />, document.getElementById("current-projects-list"));
});
