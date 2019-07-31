class UsersController < ApplicationController
  def archive_user
    @user = User.find(params[:id])
    @user.update(archived: true, admin: nil, active: true)
    head :ok
  end
end
