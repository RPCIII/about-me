Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'qualifications/index'
      post 'qualifications/create'
      get '/show/:id', to: 'qualifications#show'
      delete '/destroy/:id', to: 'qualifications#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end