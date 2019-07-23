class ManageIoController < ApplicationController
  before_action :authenticate_user!

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
end
