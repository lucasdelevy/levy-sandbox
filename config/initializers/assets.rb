# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '2.0'

Rails.application.config.assets.precompile += %w( top_button.js )
Rails.application.config.assets.precompile += %w( game_of_life.js )
Rails.application.config.assets.precompile += %w( has_matheus_portela_failed.js )
Rails.application.config.assets.precompile += %w( quaternions.js )
Rails.application.config.assets.precompile += %w( jlpt_vocabulary.js )

Rails.application.config.assets.precompile += %w( css/main.css )
Rails.application.config.assets.precompile += %w( css/header.css )
Rails.application.config.assets.precompile += %w( css/footer.css )
Rails.application.config.assets.precompile += %w( css/welcome.css )
Rails.application.config.assets.precompile += %w( css/about_me.css )
Rails.application.config.assets.precompile += %w( css/projects.css )
Rails.application.config.assets.precompile += %w( css/blog.css )
Rails.application.config.assets.precompile += %w( css/posts.css )
Rails.application.config.assets.precompile += %w( css/comments.css )
Rails.application.config.assets.precompile += %w( css/game_of_life.css )
Rails.application.config.assets.precompile += %w( css/quaternions.css )
Rails.application.config.assets.precompile += %w( css/jlpt.css )
Rails.application.config.assets.precompile += %w( css/jlpt_vocabulary.css )
Rails.application.config.assets.precompile += %w( css/resolva.css )
Rails.application.config.assets.precompile += %w( css/ttest.css )

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
