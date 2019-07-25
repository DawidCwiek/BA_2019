class AdministratorsController < ApplicationController
  before_action :authenticate_user!
  before_action :admin_user

  def index; end

  def activate_user
    @user = User.find(params[:id])
    @user.update(active: true)
    head :no_content
  end

  def add_admin
    @user = User.find(params[:id])
    @user.update(admin: true)
    head :no_content
  end

  def remove_admin
    @user = User.find(params[:id])
    @user.update(admin: false)
    head :no_content
  end

  def admin_user
    redirect_to root_path unless current_user.admin?
  end
end
