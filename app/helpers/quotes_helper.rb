module QuotesHelper
	def approved?
		if @approved.nil?
			"Not approved yet"
		else
			"Approved"
		end
	end

	def admin?
		false
	end

	def logged_in?
		if session[:uid]
			u = User.find(session[:uid])
			return !u.nil?
		else
			return false
		end
	end
end
