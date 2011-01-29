onerror = function moo(msg, url, line) {
	//alert('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + line);
}

$(document).ready(function() {
	$.getJSON("/author_list", function(data) { $("#quote_author").autocomplete({ source: data, minLength: 1 }) });
	$("form.new_quote > .actions > [type=submit]").live("click", function() {
		/*$.ajax({
			type: 'POST',
			url: 'ajax_new', 
			async: true,
			dataType: 'json',
			data: $("form.new_quote").serialize(), 
			success:*/
		$.post('/ajax_new', $('form.new_quote').serialize(), function(data) {
				if (data == "ok") {
					$(".msg").text("Ok").fadeIn('slow').delay(1000).fadeOut('slow');
				}
			}/*,
			error: function(xhr, opts, err) {
				alert(xhr.status + '\n\n' + err);
			}}*/
		);

		return false;
	});
});
