require 'digest'

class ApplicationController < ActionController::Base
  protect_from_forgery

  def lang
    I18n.default_locale = params[:lang]
    redirect_to root_url
  end

  private

  def authenticate
    authenticate_or_request_with_http_basic do |username, password|
      u = User.authenticate(username, password)
      !(u.nil?)
    end
  end

  def encode(phrase)
    Digest::SHA2.hexdigest(Digest::MD5.hexdigest(phrase))
  end
end
