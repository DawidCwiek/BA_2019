import ReactDOM from "react-dom";
import React from "react";

export default class ProjectList extends React.PureComponent {
  state = {
    projects: []
  };

  componentDidMount() {
    fetch("/project.json")
      .then(response => response.json())
      .then(projects => {
        this.setState({ projects: projects });
      });
  }

  render() {
    return (
      <div className="projects">
        {this.state.projects.map(project => {
          return (
            <div key={project.id} className="project">
              [{project.key}] {project.title} {project.desc}
            </div>
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(<ProjectList />, document.getElementById("projects"));
