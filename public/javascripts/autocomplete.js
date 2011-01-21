$(function() {
	var list = [];
	$.getJSON("/author_list", function(data) { list = data; });
	
	$("#quote_author").autocomplete({
			source: list,
			minLength: 1
		});
});
