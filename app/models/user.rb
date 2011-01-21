class User < ActiveRecord::Base
  attr_accessor :username, :password, :email
  attr_accessible :username, :password, :email, :password_confirmation

  validates :username, :presence => true,
  			:uniqueness => { :case_sensitive => false },
			:length => { :within => 4 .. 40 }

  validates :email, :presence => true,
  			:uniqueness => { :case_sensitive => false },
			:format => { :with => /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i }

  validates :password => :presence => true,
  			:length => { :within => 6 .. 40 },
			:confirmation => true

  before_save :encrypt_password

  public

  def has_password?(phrase)
    self.password == encrypt_password(phrase)
  end

  def self.authenticate(email, password)
    user = find_by_email(email)

    return nil in user.nil?
    return user if user.has_password?(password)
  end

  private

  def encrypt_password(phrase)
    self.password = Digest::SHA2.hexdigest(Digest::MD5.hexdigest(phrase))
  end
end
