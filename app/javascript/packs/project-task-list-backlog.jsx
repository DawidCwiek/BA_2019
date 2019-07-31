import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { ListGroup, ListGroupItem } from 'reactstrap';

class CurrentProjectTasksList extends React.Component {
  state = {
    tasks: [],
    suggestions: [],
    value: ""
  };

  getSuggestions = value => {
    if (!value) {
      return null;
    }
    const { tasks } = this.state;
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === "") {
      return [];
    }

    const regex = new RegExp("^" + escapedValue, "i");
    return tasks.filter(task => regex.test(task.title));
  };

  escapeRegexCharacters = str => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  onSuggestionsFetchRequested = e => {
    const value = e.target.value;
    this.setState({
      suggestions: value.length > 0 ? this.getSuggestions(value) : []
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  projectData = () => {
     axios
      .get(
        `/api/v1/project_tasks/${this.props.project.id}`,
      {
          headers: {
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
              .content
          }
        })
        .then(response => {
        this.setState({ tasks: response.data });
      });
    }

  numberList = () => {
    this.state.tasks.sort((a,b) => {
      if (a.updated_at > b.updated_at) {
        return -1
      } else {
        return 1
      }
    })

    const { tasks, suggestions } = this.state;

    const newTasksData = suggestions.length > 0 ? suggestions : tasks;
    const tasksList = newTasksData.map((task) =>
      <a href={`/manage_io/task/${task.id}`} className=" task-list-styling userdash-link">
        <ListGroupItem  className=" task-list-styling userdash-link" key={task.id}>
          [{task.project.key}] {task.title} 
        </ListGroupItem>
      </a>
    );
    return (
      <ListGroup className="striped-list">{tasksList}</ListGroup>
    );
  }


  componentDidMount() {
    this.projectData();
  }

  render() {
    return (
      <>
        <div className="searchbar-config">
        <input
          type="text"
          className="form-control fas fa-search"
          placeholder="Search..."
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={this.onSuggestionsFetchRequested}
        />
        </div>
        <div className="label-info task-scroll">{this.numberList()}</div>
      </>);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('project-task-list-backlog')
  const data = JSON.parse(node.getAttribute('data'))
  ReactDOM.render(
    <CurrentProjectTasksList project={data} />,
  document.getElementById('project-task-list-backlog'))
})
