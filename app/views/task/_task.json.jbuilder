<<<<<<< HEAD
json.extract! task, :id, :title, :desc, :project_id, :user_id, :isEpik, :created_at, :updated_at
=======
# frozen_string_literal: true

json.extract! task, :id, :title, :desc, :project_id, :created_at, :updated_at
>>>>>>> 103838f2399d4a91370d26a545857dc21f12b397
json.url task_url(task, format: :json)
