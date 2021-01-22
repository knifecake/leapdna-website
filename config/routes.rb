Rails.application.routes.draw do
  get 'convert', to: 'convert#index'
  get 'explore', to: 'explore#index'
  get 'explore/study/:id', to: 'explore#study', as: 'study_detail'

  root to: 'static_pages#index'
  get '*slug', to: 'static_pages#show', as: 'static_page'
end
