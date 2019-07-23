import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { ListGroup, ListGroupItem } from 'reactstrap';
import ConfirmationModal from './archive_modal';

class List extends React.Component {
  state = {
    projects: [],
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
      });
    }

  numberList = () => {
    this.state.projects.sort((a,b) => {
      if (a.title > b.title) {
        return -1
      } else {
        return 1
      }
    })
    this.state.projects.sort((a,b) => {
      if (a.archived > b.archived) {
        return 1
      } else {
        return -1
      }
    })
    const projects = this.state.projects;
    const projectsList = projects.map((project) =>
    { return project.archived ? 
      (<ListGroupItem key={project.id} className="archived">
        [{project.key}] {project.title}
    </ListGroupItem>) : 
      (<ListGroupItem key={project.id} tag="a" href="#" className="non-archived">
        <div className="aligning-items">[{project.key}] {project.title} <div className="archive-modal"> { <ConfirmationModal projectId={project.id} /> } </div></div>
      </ListGroupItem>) }

    );
    return (
      <ListGroup className="striped-list">{projectsList}</ListGroup>
    );
  }


  componentDidMount() {
    this.projectData();
  }

  render() {
    return <div><h2 className="title-positioning">Projects list</h2>{this.numberList()}</div>;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<List />, document.getElementById("list"));
});
