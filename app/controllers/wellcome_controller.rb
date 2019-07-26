class WellcomeController < ApplicationController
  before_action :authenticate_user!
  before_action :admin_user_redirect
  def index; end

  private

  def admin_user_redirect
    if current_user.admin?
      redirect_to administrators_path
    elsif current_user.active
      redirect_to manage_io_index_path
    else
      render :index
    end
  end
end
