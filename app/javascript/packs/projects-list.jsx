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

    axios.get("/api/v1/user.json").then(response => {
      this.setState({ user: response.data });
    });
  }

  render() {
    <div className="label-info">
      {this.state.projects.map(project => {
        return (
          <div key={project.id} className="project">
            [{project.key}] {project.title} {" "}
            { this.state.user ? <ConfirmationModal projectId={this.project.id} /> : null }
          </div>
        );
      })}
    </div>;
  }
}

ReactDOM.render(<ProjectList />, document.getElementById("col-projects"));
