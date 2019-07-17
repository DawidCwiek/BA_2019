# frozen_string_literal: true

class ProjectController < ApplicationController
  before_action :set_project, only: %i[show edit update destroy]

  def index
    @projects = Project.all
  end

  def show; end

  def create
    @project = Project.new(project_params)

    if @project.save
      render :show, status: :created, location: @project
    else
      render json: { errors: @project.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @project.update(project_params)
      render :show, status: :ok, location: @project
    else
      render json: { errors: @project.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @project.destroy
    head :no_content
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_project
    @project = Project.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def project_params
    params.require(:project).permit(:title, :desc, :key)
  end
end
