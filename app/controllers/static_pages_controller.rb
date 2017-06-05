class StaticPagesController < ApplicationController
  before_action :please_set_meta_tags

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
    $message = "/run-wild?value="+params[:value].to_s+"\&unit="+params[:unit].to_s
    puts $message

    $title_str =  'I Just Ran ' + params[:value].to_s + params[:unit].to_s + ' With Run Wild!'
    puts @title_str
  end

  $message = nil

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
    @graph_data.put_wall_post('http://lucasdelevy.herokuapp.com'+$message)
  end

  def please_set_meta_tags
    run_wild_setup

    set_meta_tags title:       $title_str,
                  description: 'RUN WILD',
                  og: {
                    title:     $title_str,
                    type:      'fitness.course',
                    url:       'http://lucasdelevy.herokuapp.com'+$message,
                    image:     'http://lucasdelevy.herokuapp.com/assets/etna-run-wild.png',
                    app_id:    '260089191125652'
                  }
  end
end