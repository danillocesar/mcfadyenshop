'use strict';
var ajax = new XMLHttpRequest()

var myHttp = {
	url: "http://localhost:8080/",
	get: function(urlPath, params, callback){
		var url = this.url + urlPath;
		this.send(url, params, null, "GET", callback);
	},
	post: function(urlPath, params, data, callback) {
		var url = this.url + urlPath;
		this.send(url, params, data, "POST", callback);
	},
	remove: function(urlPath, params, callback) {
		var url = this.url + urlPath;
		this.send(url, params, null, "DELETE", callback);
	},
	send: function(url, params, data, method, callback){
		var paramsStr = "";
		Object.getOwnPropertyNames(params).forEach(function(val, index, array) {
			  paramsStr += paramsStr==""?"?":"&";				  
			  paramsStr += val + "=" + params[val];
		});
		ajax.open(method, url + paramsStr, true);
		ajax.withCredentials = true;
		ajax.send();
		ajax.onreadystatechange = function() {
			if (ajax.readyState == 4 && ajax.status == 200) {
				var data;
				if(ajax.responseText){
					data = JSON.parse(ajax.responseText); 
				}
				callback(data);
			}
		}
	}
}
