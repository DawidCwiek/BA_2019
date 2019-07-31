class TaskController < ApplicationController
  before_action :authenticate_user!
  before_action :set_task, only: %i[show update user_belongs_to_project]
  before_action :user_belongs_to_project, only: %i[create update]

  def index
    @task = Task.all
  end

  def show; end

  def create
    @task = Task.new(task_params)
    if @task.save
      render :show, status: :created, location: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def update
    if @task.update(task_params)
      render :show, status: :ok, location: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :desc, :project_id, :column_id, :user_id)
  end

  def user_belongs_to_project
    @project = Project.find(params[:task][:project_id])

    redirect_to root_path if @project.users.where(id: current_user.id).empty? && !current_user.admin?
  end
end
