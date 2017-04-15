Rails.application.routes.draw do
  root  'static_pages#home'

  devise_for :users

  resources :restaurants, only: [ :index, :show, :new, :create ]
end
