onerror = function moo(msg, url, line) {
	//alert('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + line);
}

function moo() {
	var cnt = 0;

	$.getJSON('/after/' + $("div.quote:first").attr("id"), function(data) {
		cnt = data.length;
	});

	$(".msg").css("background-color", "#ffff00").fadeIn('slow').delay(10000).fadeOut('slow');

	setTimeout("moo()", 30000);
}

$(document).ready(function() {
	var to = setTimeout("moo()", 30000);

	$.getJSON("/author_list", function(data) { 
		$("#quote_author").autocomplete({ source: data, minLength: 1 }) 
	});

	$("form.new_quote > .actions > [type=submit]").live("click", function() {
		$.post('/ajax_new', $('form.new_quote').serialize(), function(resp) {
				resp = $.parseJSON(resp);

				if (resp[0].done == "ok") {
					$(".msg").css("background-color", "#00fe00").text("Ok").fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					$(".msg").css("background-color", "#fe0000").text("Something went wrong. Please, retry").fadeIn('slow').delay(5000).fadeOut('slow');
				}
			});

		return false;
	});

	$("#update_msg").live("click", function() {
		/*var id = $("div.quote:first").attr("id");

		$.getJSON('/after/' + id, function(data) {
			$.each(data, function() {
			});
		});*/

		return false;
	});
});
