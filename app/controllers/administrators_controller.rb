class AdministratorsController < ApplicationController
  before_action :authenticate_user!

  def index; end

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
end
