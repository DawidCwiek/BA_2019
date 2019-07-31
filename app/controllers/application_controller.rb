# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :permission

  layout :logged_and_no_logged

  protected

  def logged_and_no_logged
    if user_signed_in? && current_user.active
      if current_user.admin?
        'admin'
      else
        'logged'
      end
    else
      'no_logged'
    end
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[full_name email password])
  end

  def permission
    redirect_to root_path if !current_user.active || current_user.archived
  end
end
