$(function() {
	var list = $.getJSON("/author_list");
	
	$("#quote_author").autocomplete({
			source: list,
			minLength: 1
		});
});
