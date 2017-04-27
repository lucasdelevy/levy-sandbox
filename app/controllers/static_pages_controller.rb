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
end