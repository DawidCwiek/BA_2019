class Projects::UsersController < ApplicationController
  def index
    project = Project.find(params[:project_id])
    @users = project.users
    render 'project/users/index'
  end
end
