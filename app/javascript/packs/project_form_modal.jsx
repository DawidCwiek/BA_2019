import React from "react";
import axios from "axios";
import ReactDOM from "react-dom"

class ProjectFormModal extends React.Component {
	state = {
	  title: "",
		desc: "",
		key: "",
	};


	render() {
	  return (
			<>
				<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#createProject">
				  Create Project
				</button>

				<div className="modal fade" id="createProject" tabIndex="-1" role="dialog" aria-labelledby="createProjectLabel" aria-hidden="true">
				  <div className="modal-dialog" role="document">
				    <div className="modal-content">
				      <div className="modal-header">
				        <h5 className="modal-title" id="createProjectLabel">Create Project</h5>
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div className="modal-body">
				        ...
				      </div>
				      <div className="modal-footer">
				        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
				        <button type="button" className="btn btn-primary">Save changes</button>
				      </div>
				    </div>
				  </div>
				</div>
			</>
	  );
	}
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <ProjectFormModal />,
    document.body.appendChild(document.createElement("div"))
  );
});
