class Projects::ColumnsController < ApplicationController
  before_action :authenticate_user!

  def create
    @column = Column.new(columns_params)

    if @column.save
      render json: { data: @column }, status: :created
    else
      render json: { errors: @column.errors }, status: :unprocessable_entity
    end
  end

  def update
    @column = Column.find(params[:id])
    if @column.update(columns_params)
      render json: { data: @column }, status: :ok
    else
      render json: { errors: @column.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @column = Column.find(params[:id])
    if @column.tasks.blank?
      if @column.project.columns.count > 1
        @column.destroy
        head :no_content
      else
        render json: { errors: { error: 'The project must have one column' } }, status: :not_modified
      end
    else
      render json: { errors: { error: 'The column must be empty' } }, status: :not_modified
    end
  end

  def update_task_order
    @column = Column.find(params[:id])
    @column.update(column_tasks_params)
  end

  private

  def columns_params
    params.require(:column).permit(:project_id, :name)
  end

  def column_tasks_params
    task_ids_str = params[:tasks_order]
    task_ids = task_ids_str.map { |id| id.tr_s('task-', '').to_i }
    { tasks_order: task_ids }
  end
end
