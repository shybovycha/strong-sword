class Quote < ActiveRecord::Base
	attr_reader :per_page

	@@per_page = 10

	validates :author, 
		:presence => true, 
		:length => { :minimum => 3, :maximum => 80 }
	validates :body, 
		:presence => true, 
		:length => { :minimum => 3, :maximum => 4096 },
		:uniqueness => true
end
