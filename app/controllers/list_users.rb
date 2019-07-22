class ListUsers < ApplicationController
  def index
    @listusers = Users.all
  end
end
