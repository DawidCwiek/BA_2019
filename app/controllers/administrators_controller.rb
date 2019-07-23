class AdministratorsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: %i[add_admin]

  def index; end

  def add_admin
    @user.update(admin: true)
    head :no_content
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
