class WelcomeController < ApplicationController
  before_action :authenticate_user!
  before_action :render_layout_for_archived_user
  before_action :admin_user_redirect
  skip_before_action :permission, only: [:index]

  def index; end

  private

  def admin_user_redirect
    if current_user.active && !current_user.archived
      if current_user.admin?
        redirect_to administrators_path
      else
        redirect_to manage_io_index_path
      end
    else
      render :index
    end
  end

  def render_layout_for_archived_user
    render :archived, layout: 'no_logged' if current_user.archived
  end
end
