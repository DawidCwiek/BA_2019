set :repo_url,     'https://github.com/DawidCwiek/BA_2019.git'
set :stages,       %w(production)


set :linked_files, %w(config/database.yml config/unicorn.rb)

set :linked_dirs,  %w(log vendor/bundle tmp/sockets tmp/pids tmp/cache)

set :keep_releases, 5
set :normalize_asset_timestamps, %(public/images public/javascripts public/stylesheets)
