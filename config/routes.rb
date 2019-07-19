# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  defaults format: :json do
    resources :project do
        resources :users, only: [:index]
      end
    resources :task, except: [:new, :edit, :destroy]
  end

  resources :manage_io, only: [:index]
  resources :list_users, only: [:index]
  resources :administrators, only: [:index]

  root to: 'manage_io#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
