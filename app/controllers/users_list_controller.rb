class UsersListController < ApplicationController
  def index
    @userslist = User.where.not(confirmed_at: nil).all
  end
end
