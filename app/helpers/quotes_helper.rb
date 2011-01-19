module QuotesHelper
	def approved
		if @approved.nil?
			"Not approved yet"
		else
			"Approved"
		end
	end
end
