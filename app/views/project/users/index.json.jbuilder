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
    end
  end
end
