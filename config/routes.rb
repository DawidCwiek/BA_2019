# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'sessions' }
  defaults format: :json do
    resources :projects do
        resources :users, only: [:index], member: true, controller: 'projects/users'
      end
    resources :task, except: [:new, :edit, :destroy]
    resources :users_list, only: [:index]
  end

  namespace :api do
    namespace :v1 do
      resources :users, except: [:new, :edit, :update, :destroy, :create, :show]
      resources :tasks, only: [:index]
      resources :projects, only: [:index, :assign_user, :users_in_project]
    end
  end

  resources :wellcome, only: [:index]
  resources :manage_io, only: [:index]
  resources :administrators, only: [:index]

  root to: 'wellcome#index'
  patch '/projects/archive/:id' => 'projects#archive'
  patch '/administrators/add_admin/:id' => 'administrators#add_admin'
  patch '/administrators/user/:id' => 'administrators#activate_user'
  patch '/administrators/remove_admin/:id' => 'administrators#remove_admin'
  get '/manage_io/:id' => 'manage_io#project'
  get '/manage_io/task/:id' => 'manage_io#task'
  post '/api/v1/assign_user' => 'api/v1/projects#assign_user'
  get '/api/v1/not_assigned_users/:id' => 'api/v1/projects#not_assigned_users'
  get '/api/v1/users_in_project/:id' => 'api/v1/projects#users_in_project'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
