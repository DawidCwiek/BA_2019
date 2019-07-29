class Api::V1::ProjectsController < ApplicationController
  def index
    @projects = Project.where(user_id: current_user.id)
    render json: @projects
  end

  def not_assigned_users
    all = User.all
    project_users = Project.find(params[:id]).users
    @not_assigned_users = all - project_users
    render json: @not_assigned_users
  end

  def assign_user
    project = Project.find_by(id: params[:projectId])
    user = User.find_by(id: params[:userId])
    project.users << user
  end
end
