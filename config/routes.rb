Rails.application.routes.draw do
  root  'static_pages#home'

  devise_for :users
  resources :users, only: [ :show ]

  get '/search', to: "restaurants#index", as: :restaurants
  post '/create', to: "restaurants#create", as: :create_restaurant
  get '/new', to: "restaurants#new", as: :new_restaurant
  get '/create' => redirect( '/new' )
  get '/:id', to: "restaurants#show", as: :restaurant

  resources :restaurant_likes, only: [ :create, :destroy ]
  resources :never_agains, only: [ :create, :destroy ]

  resources :meals, only: [ :show, :new, :create, :edit, :update ]
end
