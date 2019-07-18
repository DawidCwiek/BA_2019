# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  defaults format: :json do
    resources :project, except: [:new, :edit]
    resources :task, except: [:new, :edit, :destroy]
    namespace :single_project do
      namespace :id do
       resources :users, only: [:index]
      end
    end
  end



  resources :manage_io, only: [:index]
  root to: 'manage_io#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
