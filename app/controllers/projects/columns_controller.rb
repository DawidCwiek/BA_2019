class Projects::ColumnsController < ApplicationController
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

  private

  def columns_params
    params.require(:column).permit(:project_id, :name)
  end
end
