class ProjectsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_project, only: %i[show update destroy archive]
  def index
    @projects = Project.all
  end

  def show; end

  def create
    @projects = Project.new(projects_params)

    if @projects.save
      2.times { @projects.columns.create }
      render :show, status: :created, location: @projects
    else
      render json: { errors: @projects.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @projects.update(projects_params)
      render :show, status: :ok, location: @projects
    else
      render json: { errors: @projects.errors }, status: :unprocessable_entity
    end
  end

  def update_column_order
    @project = Project.find(params[:project_id])
    @project.update(project_colums_params)
  end

  def destroy
    @projects.destroy
    head :no_content
  end

  def archive
    @projects.update(archived: true)
    head :no_content
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_project
    @projects = Project.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def projects_params
    params.require(:project).permit(:title, :desc, :key)
  end

  def project_colums_params
    params.require(:project).permit(:columns_order)
  end
end
