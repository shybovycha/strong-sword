$(document).ready(function() {
	$("[data-confirm]").click(function() { 
		if (!confirm($(this).attr("data-confirm")))
			return false;
	});

	$("a[data-method]").click(function() {
		var method = $(this).attr("data-method"),
			url = $(this).attr("hhref"),
			csrf_param = $('meta[name=csrf-param]')[0],
			csrf_token = $('meta[name=csrf-token]')[0];

		var form = new Element('form', { method: "POST", action: url, style: "display: none;" });
		    element.parent().append(form);

	    if (method !== 'post') {
	      var field = new Element('input', { type: 'hidden', name: '_method', value: method });
		      form.append(field);
	    }

	    if (csrf_param) {
	      var param = csrf_param.attr('content'),
		  token = csrf_token.attr('content'),
		  field = new Element('input', { type: 'hidden', name: param, value: token });
	      form.append(field);
	    }

	    form.submit();
	});
});
