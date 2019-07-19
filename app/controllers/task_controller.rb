# frozen_string_literal: true

class TaskController < ApplicationController
  before_action :set_task, only: %i[show edit update destroy]

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
    params.require(:task).permit(:title, :desc, :project_id, :column_id)
  end

end
