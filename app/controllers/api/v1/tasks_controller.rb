class Api::V1::TasksController < ApplicationController
  before_action :authenticate_user!

  def index
    @project_ids = current_user.projects.ids
    @tasks = current_user.task.where(project_id: @project_ids)
    render json: @tasks.to_json(include: :project)
  end

  def project_tasks
    @project_tasks = Task.where(project_id: params[:id])
    render json: @project_tasks.to_json(include: :project)
  end
end
