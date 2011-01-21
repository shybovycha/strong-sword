$(function() {
	$("#quote_author").autocomplete({
			source: "/author_list",
			minLength: 1
		});
		
	$.getJSON("/author_list", function(data) { alert(data); });
	//alert("Hello, world!");
});
