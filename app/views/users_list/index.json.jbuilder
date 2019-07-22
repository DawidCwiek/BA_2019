json.data do
  json.array! @userslist, :id, :full_name, :email, :admin
end
