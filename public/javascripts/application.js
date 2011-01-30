onerror = function moo(msg, url, line) {
	//alert('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + line);
}

function moo() {
	var cnt = 0, type = "";
	var id = $("div.quote:first").attr("id");

	$.getJSON("/after/" + id, function(data) {
		var cnt = data.length;

		if (cnt > 0)
			$(".msg").css("backgrount-color", "#ffff00").text(cnt + " new quotes added. Please, update").fadeIn('slow').delay(20000).fadeOut('slow');
	});

	setTimeout("moo()", 30000);
}

$(document).ready(function() {
	var to = setTimeout("moo()", 30000);

	$.getJSON("/author_list", function(data) { 
		$("#quote_author").autocomplete({ source: data, minLength: 1 }) 
	});
});
