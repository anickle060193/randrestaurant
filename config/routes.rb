Rails.application.routes.draw do
  root  'static_pages#home'

  devise_for :users
  resources :users, only: [ :show ]

  resources :restaurants, only: [ :index, :show, :new, :create ]

  resources :restaurant_likes, only: [ :create, :destroy ]
end
