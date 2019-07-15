import React from 'react';
import ReactDOM from 'react-dom';

class SideNav extends React.Component {
  render() {
    return (
      <div className="wrapper">
      <nav id="sidebar">
        <div className="sidebar-header">
            <h1>Manage.io</h1>
        </div>

        <ul className="list-unstyled components">
            <li>
                <a href="#">Kanban</a>
            </li>
            <li>
                <a href="#">Backlog</a>
            </li>
            <li>
              <a href="#">Create task</a>
            </li>
            <li>
              <a href="#">Logout</a>
            </li>
        </ul>
      </nav>
    </div>
    )
  }
};

ReactDOM.render(
  <SideNav />, getElementById('sidenav')
);