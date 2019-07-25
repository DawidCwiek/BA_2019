class SessionsController < Devise::SessionsController

    def new
      flash.clear
      super
    end
  end