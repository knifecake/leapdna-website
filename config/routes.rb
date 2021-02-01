Rails.application.routes.draw do
  get 'explore', to: 'explore#index'
  get 'explore/study/:id', to: 'explore#study', as: 'study_detail'
  get 'explore/locus/:id', to: 'explore#locus', as: 'locus_detail'
  
  get 'convert', to: 'convert#index'

  root to: 'static_pages#index'

  # render static pages from markdown in Rails.root / static
  get '*slug', to: 'static_pages#show', as: 'static_page'
end
