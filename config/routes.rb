Rails.application.routes.draw do
  devise_for :users
  resources :project

  resources :task
  resources :manage_io, only: ['index']
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
