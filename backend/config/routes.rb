Rails.application.routes.draw do
  devise_for :users, 
              defaults: { format: :json },
              path: '',
              path_names: {
                registration: 'register',
                sign_in: 'login',
                sign_out: 'logout'
             },
              controllers: {
                sessions: 'users/sessions',
                registrations: 'users/registrations'
              }

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get "protected" => "child#protected", as: :protected_route
  get "unprotected" => "child#unprotected", as: :unprotected_route

  resources :blogs
  # Admin namespace for admin-only controllers
  namespace :admin do
    resources :users  # This maps to your Admin::UsersController
  end

  
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  
  # Defines the root path route ("/")
  # root "posts#index"
end
