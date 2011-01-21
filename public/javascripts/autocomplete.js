$(document).ready(function() {
	$("#quote_author").autocomplete({
			source: "/authors",
			minLength: 1
		});
});
