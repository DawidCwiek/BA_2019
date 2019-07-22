class ManageIoController < ApplicationController
  before_action :authenticate_user!

  def index
    @projects = Project.all
    @task = Task.all
  end
end
