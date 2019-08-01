class Api::V1::ProjectsController < ApplicationController
  before_action :authenticate_user!

  def index
    @projects = current_user.projects
    render json: @projects
  end

  def not_assigned_users
    all = User.all
    project_users = Project.find(params[:id]).users
    @not_assigned_users = all - project_users
    render json: @not_assigned_users
  end

  def users_in_project
    project_users = Project.find(params[:id]).users
    render json: project_users
  end

  def assign_user
    project = Project.find_by(id: params[:projectId])
    user = User.find_by(id: params[:userId])
    project.users << user
  end
end
