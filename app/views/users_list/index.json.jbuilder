json.data do
  json.array! @listusers, :id, :full_name, :email
end