class ManageIoController < ApplicationController


  def index
    @projects = Project.all
    @task = Task.all
  end
end
