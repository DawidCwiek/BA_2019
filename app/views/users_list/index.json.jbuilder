json.data do
  json.array! @userslist, :id, :full_name, :email, :admin, :active, :confirmed_at
end
