class Api::V1::UsersController < ApplicationController
  def index
    @user = current_user.super_admin
    render json: @user
  end
end
