json.data do
  json.array! @users, :id, :full_name, :email
end