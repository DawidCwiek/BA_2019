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
        this.setState({ projects: projects.data });
      });
  }

  render() {
    return (
      <div className="label-info">
        {this.state.projects.map(project => {
          return (
            <div key={project.id} className="project">
              [{project.key}] {project.title}
            </div>
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(<ProjectList />, document.getElementById("col-projects"));
