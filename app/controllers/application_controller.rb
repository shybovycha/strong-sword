require 'digest'

class ApplicationController < ActionController::Base
  protect_from_forgery

  private

  def authenticate
    authenticate_or_request_with_http_basic do |username, password|
      u = User.with(:username => username)

      !(u.nil?) && (u.password == encode(password))
    end
  end

  def encode(phrase)
    Digest::SHA2.hexdigest(Digest::MD5.hexdigest(phrase))
  end
end
