# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  # layout :dupa

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[full_name email password])
  end

  # def dupa
  #   current_user ? 'application' : 'login'
  # end
end
