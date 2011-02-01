class Quote < ActiveRecord::Base
	validates :author, 
		:presence => true, 
		:length => { :minimum => 3, :maximum => 80 }
	validates :body, 
		:presence => true, 
		:length => { :minimum => 3, :maximum => 4096 },
		:uniqueness => true
end
