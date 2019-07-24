# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
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
    end
  end

  resources :manage_io, only: [:index]
  resources :administrators, only: [:index]

  root to: 'manage_io#index'
  patch '/projects/archive/:id' => 'projects#archive'
  patch '/administrators/user/:id' => 'administrators#activate_user'
  patch '/administrators/add_admin/:id' => 'administrators#add_admin'
  get '/manage_io/:id' => 'manage_io#project'
  get '/manage_io/task/:id' => 'manage_io#task'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
