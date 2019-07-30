class WelcomeController < ApplicationController
  before_action :authenticate_user!
  before_action :render_layout_for_archived_user
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

  def render_layout_for_archived_user
    current_user.archived ? (render :archived) : (render :index)
  end
end
