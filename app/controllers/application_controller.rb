# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  layout :logged_and_no_logged

  protected

  def logged_and_no_logged
    user_signed_in? ? "logged" : "no_logged"
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[full_name email password])
  end

end
