json.data do
  json.array! @users, :full_name, :email
end