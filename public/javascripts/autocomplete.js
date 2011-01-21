$(function() {
	$("#quote_author").autocomplete({
			source: "/authors",
			minLength: 1
		});
		
	alert("Hello, world!");
});
