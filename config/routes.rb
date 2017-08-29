Rails.application.routes.draw do

  root                     								        'static_pages#welcome'
  get		'/what-have-you-done'					         => 'static_pages#projects'
  get		'/game-of-life'							           => 'static_pages#game_of_life'
  get		'/has-matheus-portela-failed-already'  =>	'static_pages#has_matheus_portela_failed'
  get   '/who-are-you'							           =>	'static_pages#about_me'
  get   '/quaternions'                         => 'static_pages#quaternions'
  get   '/proximo-episodio-sera'               => 'static_pages#dbz'
  get   '/jlpt'                                => 'static_pages#jlpt'
  get   '/jlpt/vocabulary'                     => 'static_pages#jlpt_vocabulary'
  get   '/jlpt/vocabulary/sample'              => 'static_pages#jlpt_vocabulary_get'
  get   '/jlpt/grammar'                     => 'static_pages#jlpt_grammar'
  get   '/jlpt/grammar/sample'              => 'static_pages#jlpt_grammar_get'
  get   '/jlpt/kanji'                     => 'static_pages#jlpt_kanji'
  get   '/jlpt/kanji/sample'              => 'static_pages#jlpt_kanji_get'
  get   '/run-wild'                            => 'static_pages#run_wild_setup'
  get   '/run-wild/run'                        => 'static_pages#run_wild'
  get   '/run-wild/callback'                   => 'static_pages#run_wild_callback'
  get   '/triggered'                           => 'static_pages#triggered'
  get   '/blog'	 								               =>	'posts#index'
  get   '/signup'  								             =>	'users#new'
  get   '/login'   								             =>	'sessions#new'
  post  '/login'   								             =>	'sessions#create'
  get   '/logout'  								             =>	'sessions#destroy'
  
  resources :posts, :path => 'blog' do
    resources :comments
  end
end