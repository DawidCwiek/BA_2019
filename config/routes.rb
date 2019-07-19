# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  defaults format: :json do
    resources :project, except: [:new, :edit]
    resources :task, except: [:new, :edit, :destroy]
  end

  resources :manage_io, only: [:index]

  root to: 'manage_io#index'
  get '/project/archive/:id' => 'project#archive', :defaults => { :format => :json }
  
  namespace :api do
    namespace :v1 do
        resources :users, except: [:new, :edit, :destroy, :update, :create, :show]
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
