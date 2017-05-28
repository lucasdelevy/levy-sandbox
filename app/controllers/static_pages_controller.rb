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

  def run_wild_setup
  end

  def run_wild
    $oauth = Koala::Facebook::OAuth.new(APP_ID, APP_SECRET, REDIRECT_URI)
    @auth_url = $oauth.url_for_oauth_code(:permissions=>'publish_actions', :state=>'RANDOMSTRINGS')
    redirect_to @auth_url
  end

  def run_wild_callback
    # auth established, now do a graph call:
    @access_token = $oauth.get_access_token(params[:code])

    @graph_data = Koala::Facebook::API.new(@access_token)
    @graph_data.get_object('me')
    @graph_data.get_connection('me', 'feed')
    # @graph_data.put_wall_post('Testando' + (0...8).map { (65 + rand(26)).chr }.join)
    @graph_data.put_wall_post('Testando' + (0...8).map { (65 + rand(26)).chr }.join)
  end
end