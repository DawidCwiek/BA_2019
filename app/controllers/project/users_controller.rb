class Project::UsersController < ApplicationController
  def index
    project = Project.find(params[:id])
    @users = project.users
  end
end
