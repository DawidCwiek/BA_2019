# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  defaults format: :json do
    resources :projects do
        resources :users, only: [:index]
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
  get '/project/archive/:id' => 'projects#archive'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
