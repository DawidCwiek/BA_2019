class Api::V1::TasksController < ApplicationController
  def index
    @tasks = Task.where( { user_id: current_user.id } )
    render json: @tasks.to_json(:include => :project)
  end
end