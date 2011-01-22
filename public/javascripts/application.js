$(document).ready(function() {
	$("[data-confirm]").click(function() { 
		if (!confirm($(this).attr("data-confirm")))
			return false;

		if ($(this).attr("data-method")) {
			var method = $(this).attr("data-method"),
					url = $(this).attr("hhref"),
				csrf_param = $('meta[name=csrf-param]')[0],
				csrf_token = $('meta[name=csrf-token]')[0],
				_data = {};

			if (method !== 'post')
				_data['_method'] = method;

			if (csrf_param) {
				var param = csrf_param['content'],
					token = csrf_token['content'];

				_data[param] = token;
			}

			alert('stage3');

			$.post(url, _data, function(data) { alert(data); } );
		}
	});
});
