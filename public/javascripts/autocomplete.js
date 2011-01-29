onerror = function moo(msg, url, line) {
	//alert('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + line);
}

$(document).ready(function() {
	$.getJSON("/author_list", function(data) { $("#quote_author").autocomplete({ source: data, minLength: 1 }) });
	$("form.new_quote > .actions > [type=submit]").live("click", function() {
		$.post('/ajax_new', $('form.new_quote').serialize(), function(resp) {
				resp = jQuery.parseJSON(resp);

				if (resp[0].done == "ok") {
					$(".msg").toggleClass("msg-ok").text("Ok").fadeIn('slow').delay(2500).fadeOut('slow');
				} else {
					$(".msg").toggleClass("msg-error").text("Something went wrong. Please, retry").fadeIn('slow').delay(2500).fadeOut('slow');
				}
			});

		return false;
	});
});
