class ManageIoController < ApplicationController
  before_action :authenticate_user!
  before_action :user_active

  def index
    @projects = Project.all
    @task = Task.all
  end

  def project
    @project = Project.find(params[:id])
    # rubocop:disable Style/GuardClause
    unless current_user.admin?
      return redirect_to manage_io_index_path if @project.users.where(id: current_user.id).empty?
    end
    # rubocop:enable Style/GuardClause
  end

  def task
    @task = Task.find(params[:id])
    # rubocop:disable Style/GuardClause
    unless current_user.admin?
      return redirect_to manage_io_index_path if current_user.projects.where(id: @task.project).empty?
    end
    # rubocop:enable Style/GuardClause
  end

  def backlog
    @backlog = Project.find(params[:id])
    # rubocop:disable Style/GuardClause
    unless current_user.admin?
      return redirect_to manage_io_index_path
    end
    # rubocop:enable Style/GuardClause
  end

  private

  def user_active
    redirect_to root_path unless current_user.active
  end
end
