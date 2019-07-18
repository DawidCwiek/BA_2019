class SingleProject::Id::UsersController < ApplicationController

    def index
        @users = User.all
    end
end