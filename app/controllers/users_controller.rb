class UsersController < ApplicationController
  def archive_user
    @user = User.find(params[:id])
    @user.update(archived: true, admin: nil, active: false)
    head :no_content
  end
end
