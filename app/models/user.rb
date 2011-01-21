require 'digest'

class User < ActiveRecord::Base
  #attr_accessor :password
  attr_accessible :username, :password, :email, :password_confirmation

  validates :username, :presence => true,
  			:uniqueness => { :case_sensitive => false },
			:length => { :within => 3 .. 40 }

  validates :email, :presence => true,
  			:uniqueness => { :case_sensitive => false },
			:format => { :with => /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i }

  validates :password, :presence => true,
  			:length => { :within => 6 .. 40 },
			:confirmation => true

  before_save :encrypt_password
  
  public

  def has_password?(phrase)
    self.password == encrypt(phrase)
  end

  def self.authenticate(username, password)
    user = find_by_username(username)

    return nil if user.nil?
    return user if user.has_password?(password)
  end

  def encrypt(phrase)
    return Digest::SHA2.hexdigest(phrase)
  end

  private

  def encrypt_password
    self.password = encrypt(self.password)
  end

  def set_noadmin
    self.admin = false if self.admin.nil?
  end
end
