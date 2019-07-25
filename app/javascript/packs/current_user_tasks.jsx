import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { ListGroup, ListGroupItem } from 'reactstrap';

class CurrentUserTasksList extends React.Component {
  state = {
    tasks: [],
  };

  projectData = () => {
     axios
      .get(
        "/api/v1/tasks.json",
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
    
    const tasks = this.state.tasks;
    const tasksList = tasks.map((task) =>
      <ListGroupItem  className=" task-list-styling userdash-link" key={task.id} href="#">
        [{task.project.key}] {task.title}
      </ListGroupItem>

    );
    return (
      <ListGroup className="striped-list">{tasksList}</ListGroup>
    );
  }


  componentDidMount() {
    this.projectData();
  }

  render() {
    return <div className="label-info task-scroll">{this.numberList()}</div>;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<CurrentUserTasksList />, document.getElementById("current-tasks-list"));
});
