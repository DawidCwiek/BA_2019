class Api::V1::TasksController < ApplicationController
  def index
    @tasks = Task.where(user_id: current_user.id)
    render json: @tasks.to_json(include: :project)
  end

  def project_tasks
    @project_tasks = Task.where(project_id: params[:id])
    render json: @project_tasks.to_json(include: :project)
  end
end
