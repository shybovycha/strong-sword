$(function() {
	$.getJSON("/author_list", function(data) { $("#quote_author").autocomplete({ source: data, minLength: 1 }) });
});
