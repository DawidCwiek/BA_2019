Rails.application.routes.draw do
  devise_for :users
  resources :project

  resources :task
  resources :manage_io, only: ['index']
<<<<<<< HEAD

=======
>>>>>>> b5d731e494b284e8c201c7f07931c0cdef79379c
  root to: 'manage_io#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
