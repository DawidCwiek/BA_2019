import React from 'react';
import ReactDOM from "react-dom";
import axios from "axios";
import { ListGroup, ListGroupItem } from 'reactstrap';
import ConfirmationModal from './archive_modal';

class List extends React.Component {
  state = {
    projects: [],
    user: [],
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
      axios.get("/api/v1/user.json").then(response => {
        this.setState({ user: response.data });
      });
    }

  numberList = () => {
    const projects = this.state.projects;
    const projectsList = projects.map((project) =>
    // <ListGroupItem key={project.id} tag="a" href="#">
    //     [{project.key}] {project.title} { project.archived ? null : <ConfirmationModal projectId={project.id} /> }
    // </ListGroupItem>
    { return project.archived ? 
      (<ListGroupItem key={project.id} className="archived">
        [{project.key}] {project.title}
    </ListGroupItem>) : 
      (<ListGroupItem key={project.id} tag="a" href="#" className="non-archived">
        [{project.key}] {project.title} { <ConfirmationModal projectId={project.id} /> }
      </ListGroupItem>) }

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
    <List />,
    document.getElementById("list")
  );
});
