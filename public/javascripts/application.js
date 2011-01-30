onerror = function moo(msg, url, line) {
	//alert('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + line);
}

$(document).ready(function() {
	$.getJSON("/author_list", function(data) { 
		$("#quote_author").autocomplete({ source: data, minLength: 1 }) 
	});

	$('.shorten').click(function() {
		$.getJSON("http://api.bit.ly/v3/shorten", { 
			"login" : "shybovycha", 
			"apiKey" : "R_2f8d872eba650d5a459a2d2b7e3e6c5f",
			"longUrl" : $(this).attr("href"),
			"format" : "json" }, function(data) {
				if (data.status_code == 200)
					$(this).attr("href", data.data.url);
		});

		return false;
	});
});
