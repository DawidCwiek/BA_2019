class UsersListController < ApplicationController
  def index
    @userslist = User.all
  end
end
