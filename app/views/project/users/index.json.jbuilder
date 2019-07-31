json.data do
  json.call(@project, :columns_order)
  json.users do
    json.array! @project.users do |user|
      json.call(user, :id, :full_name, :email)
    end
  end
  json.columns do
    json.array! @project.columns do |column|
      json.call(column, :id, :name)
      json.tasks_order do
        json.array! column.tasks_order.map { |task| "task-#{task}" }
      end
    end
  end
  json.task do
    json.array! @project.task do |tasks|
      json.call(tasks, :column_id, :title)
      json.id "task-#{ tasks.id }"
    end
  end
end
