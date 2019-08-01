import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { ListGroup, ListGroupItem } from "reactstrap";
import ConfirmationModal from "./archive_modal";
import ProjectEditModal from "./project_edit_modal";
import Users from "./button-users-list";
import DeleteUser from "./delete-user-from-project";

class List extends React.Component {
  state = {
    projects: []
  };

  projectData = () => {
    axios
      .get("/projects.json", {
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
            .content
        }
      })
      .then(response => {
        this.setState({ projects: response.data.data });
      });
  };

  numberList = () => {
    this.state.projects.sort((a, b) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return -1;
      } else {
        return 1;
      }
    });
    this.state.projects.sort((a, b) => {
      if (a.archived > b.archived) {
        return 1;
      } else {
        return -1;
      }
    });

    const projects = this.state.projects;
    const projectsList = projects.map(project => {
      const ProjectUser = project.users.map(user => {
        return (
          <div className="padding">
            <span>{user.full_name}</span>{" "}
            <DeleteUser UserId={user.id} ProjectId={project.id}>
              Delete
            </DeleteUser>
          </div>
        );
      });
      return project.archived ? (
        <ListGroupItem key={project.id} className="archived">
          [{project.key}] {project.title}
        </ListGroupItem>
      ) : (
        <ListGroupItem key={project.id} tag="a" className="non-archived">
          <div className="aligning-items">
            <a href={`/manage_io/${project.id}`} className="task-list-styling admindash-link">[{project.key}] {project.title}</a>
            <div className="aligning-items">
              <div className="edit-button">
                <Users ProjectUser={ProjectUser}> </Users>
              </div>
              <div className="edit-button">
                {
                  <ProjectEditModal
                    projectData={this.projectData}
                    projectId={project.id}
                    theProject={project}
                  />
                }
              </div>
              <div className="archive-modal">
                {
                  <ConfirmationModal
                    projectData={this.projectData}
                    projectId={project.id}
                  />
                }
              </div>
            </div>
          </div>
        </ListGroupItem>
      );
    });
    return <ListGroup className="striped-list">{projectsList}</ListGroup>;
  };

  componentDidMount() {
    this.projectData();
  }

  render() {
    return (
      <>
        <h2 className="title-positioning sign-up-header">Projects list</h2>
        {this.numberList()}
      </>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<List />, document.getElementById("list"));
});
