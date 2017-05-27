class StaticPagesController < ApplicationController
  def welcome
  end

  def about_me
  end

  def projects
  end

  def game_of_life
  end

  def quaternions
  end

  def jlpt_vocabulary
  end

  def jlpt_vocabulary_get
    num_questions = params[:num_questions].to_f
    jlpt_vocabulary = JlptVocabulary.where(level:params[:level]).sample(num_questions)

    respond_to do |format|
      format.json { render :json => jlpt_vocabulary }
    end
  end

  def run_wild
    puts "oi"
    @oauth = Koala::Facebook::OAuth.new(APP_ID, APP_SECRET, SITE_URL + 'callback/')
    puts "oi1"
    @auth_url =  @oauth.url_for_oauth_code(:permissions=>"publish_actions", :state=>"RANDOMSTRINGS")
    puts "oi2"
    @access_token = @oauth.get_access_token(params[:code])
    @access_token_info = @oauth.get_access_token_info(params[:code])
  end

  def run_wild_callback
    # auth established, now do a graph call:
      
    @api = Koala::Facebook::API.new(@access_token)
    @graph_data = @api.get_object("/me/statuses", "fields"=>"message")
    @graph_data.put_connections("me", "feed", message: "I am writing on my wall!")
  end
end