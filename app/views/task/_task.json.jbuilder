json.extract! task, :id, :title, :desc, :project_id, :user_id, :isEpik, :created_at, :updated_at
json.url task_url(task, format: :json)
