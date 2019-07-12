json.extract! task, :id, :title, :desc, :project_id, :created_at, :updated_at
json.url task_url(task, format: :json)
