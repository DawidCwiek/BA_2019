import React from 'react';
import ReactDOM from 'react-dom';

export class SideNav extends React.Component {
  render() {
    return (
        <div>
          <h1 className="sidebar-header">Manage.io</h1>
      
          <ul className="list-unstyled components">
            <li>
              <a href="#">Kanban</a>
            </li>
            <li>
              <a href="#">Backlog</a>
            </li>
            <li>
              <a href="#" className="border_bottom">Create task</a>
            </li>
            <li>
              <a href="#">Logout</a>
            </li>
          </ul>
        </div>
    )
  }
};

ReactDOM.render(<SideNav />, document.getElementById('sidenav'));