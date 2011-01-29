onerror = function moo(msg, url, line) {
	//alert('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + line);
}

function moo() {
	var cnt = 0, type = "";

	$.getJSON('/after/' + $("div.quote:first").attr("id"), function(resp) {
		cnt = resp.length;
		
		if (cnt > 0)
			$(".msg").css("background-color", "#ffff00").text(cnt + " new quotes found. Please, update!").fadeIn('slow').delay(20000).fadeOut('slow');
	});

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
					$("#quote_author").val("");
					$("#quote_body").html("");
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
