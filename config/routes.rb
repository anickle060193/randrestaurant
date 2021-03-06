Rails.application.routes.draw do
  root  'static_pages#home'

  devise_for :users
  resources :users, only: [ :show ]

  get '/search', to: "restaurants#search", as: :restaurants_search
  get '/:place_id', to: "restaurants#show", as: :restaurant

  resources :restaurant_likes, only: [ :create, :destroy ]
  resources :never_agains, only: [ :create, :destroy ]

  resources :meals, only: [ :show, :new, :create, :edit, :update, :destroy ]

  resources :possible_meal_restaurants, only: [ :create, :destroy ]

  resources :meal_attendees, only: [ :create, :destroy ]

  resources :possible_meal_restaurant_votes, only: [ :create, :update, :destroy ]
end
