# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
#index
Rails.application.config.assets.precompile += %w( index/firefly.index.js index/firefly.index.css )
#posts
Rails.application.config.assets.precompile += %w( helpers/posts/firefly.posts.js )
#Chat
Rails.application.config.assets.precompile += %w( helpers/chat/firefly.chat.js )
#home
Rails.application.config.assets.precompile += %w( home/firefly.home.js home/firefly.home.css )
#profile
Rails.application.config.assets.precompile += %w( profile/firefly.profile.css )
#people
Rails.application.config.assets.precompile += %w( helpers/people/firefly.people_helper.js people/firefly.people.js )
