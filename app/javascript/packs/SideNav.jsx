import React from 'react';
import ReactDOM from 'react-dom';

export class SideNav extends React.Component {
  render() {
    return (
        <div>
          <h1 className="sidebar-header">Manage.io</h1>
      
          <ul className="ul-styling">
            <li className="li-styling">
              <a href="#" className="link-hover">Kanban</a>
            </li>
            <li className="li-styling">
              <a href="#" className="link-hover">Backlog</a>
            </li>
            <li className="li-styling li-last-item">
              <a href="#" className="link-hover">Create task</a>
            </li>
            <li>
              <a href="localhost:3000/users/sign_out" className="link-hover last-child ">Logout</a>
            </li>
          </ul>
        </div>
    )
  }
};

ReactDOM.render(<SideNav />, document.getElementById('sidenav'));