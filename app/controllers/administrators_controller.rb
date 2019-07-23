class AdministratorsController < ApplicationController
  before_action :authenticate_user!

  def index; end

  def add_admin
    @user = User.find(params[:id])
    @user.update(admin: true)
    head :no_content
  end
end
