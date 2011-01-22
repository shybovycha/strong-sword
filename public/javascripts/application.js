$(document).ready(function() {
	$("[data-confirm]").click(function() { 
		if (!confirm($(this).attr("data-confirm")))
			return false;

		if ($(this).attr("data-method")) {
			var method = $(this).attr("data-method"),
					url = $(this).attr("hhref"),
				csrf_param = $('meta[name=csrf-param]')[0],
				csrf_token = $('meta[name=csrf-token]')[0],
				data = {};

			if (method !== 'post')
				data['_method'] = method;

			if (csrf_param) {
				var param = csrf_param.attr('content'),
					token = csrf_token.attr('content');

				data[param] = token;
			}

			if (!confirm(data))
				return false; else
					$.post(url, data, function(data) { alert(data); } );
		}
	});

	$("a[data-method]").click(function() {
			/*var form = new Element('form', { method: "POST", action: url, style: "display: none;" });
		    $(this).parent().append(form);

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

	    form.submit();*/
	});
});
