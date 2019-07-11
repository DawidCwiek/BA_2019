class ProjectController < ApplicationController

  def index
    @projects = Post.where(user_id: current_user)
  end



end
