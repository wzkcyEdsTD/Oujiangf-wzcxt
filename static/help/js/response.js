$(document).ready(function() { 
	var search = window.location.search.substr(window.location.search.indexOf('?') + 1);
	var paramObj = {};
	search && search.split('&').forEach(function (item) {
		var arr = item.split('=');
		paramObj[arr[0]] = arr[1];
	});
	var dom = '#res-block_' + (paramObj['req'] ? paramObj['req'] : 1);
	$(dom).show();
});

