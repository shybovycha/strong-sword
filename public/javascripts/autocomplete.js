onerror = function moo(msg, url, line) {
	//alert('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + line);
}

$(document).ready(function() {
	$.getJSON("/author_list", function(data) { 
		$("#quote_author").autocomplete({ source: data, minLength: 1 }) 
	});

	$("form.new_quote > .actions > [type=submit]").live("click", function() {
		$.post('/ajax_new', $('form.new_quote').serialize(), function(resp) {
				resp = jQuery.parseJSON(resp);

				if (resp[0].done == "ok") {
					$(".msg").css("background-color", "#00fe00").text("Ok").fadeIn('slow').delay(2500).fadeOut('slow');
				} else {
					$(".msg").css("background-color", "#fe0000").text("Something went wrong. Please, retry").fadeIn('slow').delay(2500).fadeOut('slow');
				}
			});

		return false;
	});

	$("#update_msg").live("click", function() {
		var id = $("div.quote:first").attr("id");

		$.getJSON('/quotes/after/' + id, function(data) {
			alert("Data: " + data + "\n\n(" + typeof data + ")");
		});

		return false;
	});
});
