class Projects::UsersController < ApplicationController
  def index
    @project = Project.find(params[:project_id])
    render 'project/users/index'
  end
end
