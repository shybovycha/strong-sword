$(document).ready(function() {
	$("[data-confirm]").click(function() { 
		if (!confirm($(this).attr("data-confirm")))
			return false;
	});
});
