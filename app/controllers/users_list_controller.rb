class UsersListController < ApplicationController
  before_action :authenticate_user!

  def index
    @userslist = User.where.not(confirmed_at: nil).all
  end
end
