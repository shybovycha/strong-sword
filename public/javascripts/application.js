onerror = function moo(msg, url, line) {
	//alert('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + line);
}

function moo() {
	var cnt = 0, type = "";
	var id = $("div.quote:first").attr("id");

	$.get("/after/" + id, function(data) {
		$("div#" + id).before(data);
	});

	setTimeout("moo()", 30000);
}

$(document).ready(function() {
	var to = setTimeout("moo()", 30000);

	$.getJSON("/author_list", function(data) { 
		$("#quote_author").autocomplete({ source: data, minLength: 1 }) 
	});

	$("form.new_quote > .actions > [type=submit]").one("click", function() {
		$.post('/ajax_new', $('form.new_quote').serialize(), function(resp) {
				resp = $.parseJSON(resp);

				if (resp[0].done == "ok") {
					$(".msg").css("background-color", "#00fe00").text("Ok").fadeIn('slow').delay(5000).fadeOut('slow');
					$("#quote_author,#quote_body").each(function(i,e) {
						$(this).val("");
					});
				}/* else {
					$(".msg").css("background-color", "#fe0000").text("Something went wrong. Please, retry").fadeIn('slow').delay(5000).fadeOut('slow');
				}*/
			});

		return false;
	});

	$("#msg").one("click", function() {
		$(".content > .quote:hidden").each(function() {
			$(this).show();
		});

		$(this).hide();

		return false;
	});
});
