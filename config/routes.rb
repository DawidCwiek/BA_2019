# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  defaults format: :json do
    resources :projects do
        resources :users, only: [:index], controller: 'projects/users'
        resources :columns, only: [:create, :update, :destroy], controller: 'projects/columns'
      end
    resources :task, except: [:new, :edit, :destroy]
    resources :users_list, only: [:index]
  end

  namespace :api do
    namespace :v1 do
      resources :users, except: [:new, :edit, :update, :destroy, :create, :show]
      resources :tasks, only: [:index, :project_tasks]
      resources :projects, only: [:index, :assign_user]
    end
  end

  resources :welcome, only: [:index, :archived]
  resources :manage_io, only: [:index]
  resources :administrators, only: [:index]

  root to: 'welcome#index'
  patch '/projects/archive/:id' => 'projects#archive'
  patch '/projects/update_column/:project_id' => 'projects#update_column_order'
  patch '/columns/update_task/:id' => 'projects/columns#update_task_order'
  patch '/users/archive/:id' => 'users#archive_user'
  patch '/administrators/add_admin/:id' => 'administrators#add_admin'
  patch '/administrators/user/:id' => 'administrators#activate_user'
  patch '/administrators/remove_admin/:id' => 'administrators#remove_admin'
  get '/manage_io/:id' => 'manage_io#project'
  get '/manage_io/task/:id' => 'manage_io#task'
  get '/manage_io/backlog/:id' => 'manage_io#backlog'
  post '/api/v1/assign_user' => 'api/v1/projects#assign_user'
  get '/api/v1/not_assigned_users/:id' => 'api/v1/projects#not_assigned_users'
  get '/api/v1/project_tasks/:id' => 'api/v1/tasks#project_tasks'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
