module QuotesHelper
	def approved
		if @approved.nil?
			false
		else
			true
		end
	end
end
