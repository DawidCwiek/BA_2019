class ManageIoController < ApplicationController
  before_action :authenticate_user!

  def index
    @projects = Project.all
    @task = Task.all
  end

  def project
    @project = Project.find(params[:id])

    if @project.users.where(id: current_user.id).empty?
      return redirect_to manage_io_index_path
    end
  end
end
