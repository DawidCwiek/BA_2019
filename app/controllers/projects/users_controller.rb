class Projects::UsersController < ApplicationController
  def index
    @project = Project.find(params[:project_id])
    render 'project/users/index'
  end

  def archive_user
    @user = User.find(params[:id])
    @user.update(archived: true, admin: nil, active: false)
    head :no_content
  end
end
