class AdministratorsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: %i[addAdmin]

  def index; end

 
  def addAdmin
    @user.update(admin: true)
    head :no_content
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

end
