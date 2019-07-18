import ReactDOM from "react-dom";
import React from "react";
import axios from "axios";

export default class ProjectList extends React.PureComponent {
  state = {
    projects: [],
    user: []
  };

  componentDidMount() {
    fetch("/project.json")
      .then(response => response.json())
      .then(projects => {
        this.setState({ projects: projects.data });
      });

    axios
      .get("http://localhost:3000/api/v1/user.json")
      .then(response => {
        console.log(response);
        this.setState({ user: response.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    if (this.state.user == true) {
      return (
        <div className="label-info">
          {this.state.projects.map(project => {
            return (
              <div key={project.id} className="project">
                [{project.key}] {project.title}{" "}
                <ConfirmationModal projectId={this.project.id} />
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="label-info">
          {this.state.projects.map(project => {
            return (
              <div key={project.id} className="project">
                [{project.key}] {project.title}/>
              </div>
            );
          })}
        </div>
      );
    }
  }
}

ReactDOM.render(<ProjectList />, document.getElementById("col-projects"));
