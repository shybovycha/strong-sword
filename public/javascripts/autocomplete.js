onerror = function moo(msg, url, line) {
	//alert('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + line);
}

$(document).ready(function() {
	$.getJSON("/author_list", function(data) { $("#quote_author").autocomplete({ source: data, minLength: 1 }) });
	$("form.new_quote > .actions > [type=submit]").live("click", function() {
		$.post("/quotes/create", $(".new_quote").serialize(), function(data) {
			if (data.status == "ok") {
				$(".msg").text("Ok").fadeIn('slow').delay(1000).fadeOut('slow');
			}
		});

		return false;
	});
});
