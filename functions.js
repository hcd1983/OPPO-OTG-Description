"use strict";

function GetUserAgent(){
	return navigator.userAgent;
}

function GetUserLang(){
	return navigator.language;
}

function fetchJSONFile(path, callback) {

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
}

function CreateHtmlbyLanguage(language){
	var _language = language.replace("-", '_');
	var _data = data[_language];
	var html = HtmlGenerator(_data);
	$("#content").html(html);
}

function CreateHtmlbyJson(file){
	var html = "";
	var data = fetchJSONFile(file, function(data){
		// console.log(data);
		// for (var i = 0; i < data.length; i++) {
		// 	html += _HtmlGenerator(data[i]);
		// }

		html = HtmlGenerator(data);

		$("#content").html(html);
	});

	
}

function HtmlGenerator(json){
	var _default = {
			"title" : "",
			"steps" : [],
		};

	var _setting = Object.assign( _default, json);
	var html = `<h1>${_setting.title}</h1>`;
	for (var i = 0; i < _setting.steps.length; i++) {
		var _step = _setting.steps[i];
		
		html += `<h3>${_step.content}</h3>`;
		
		if(typeof _step.image !== "undefined"){
			html += `<div id="imagebox_${i}" class="imagebox"><img src="${_step.image}"></div>`;
		}
	}

	return html;
}


// function _HtmlGenerator(json){
	
// 	function Normal(json){
// 		var html = "";
// 		var tag = json.tag;
// 		var content = json.content;
// 		var att_str = "";
// 		var key;

// 		for (key in json.att) {
		    
// 		    if (json.att.hasOwnProperty(key)){
// 		    	var value = json.att[key];
// 		    	att_str += `${key}="${value}"`;
// 		    };
// 		}

// 		html += `
// 		<${tag} ${att_str}>
// 			${content}
// 		</${tag}>
// 		`;
// 		return html;
// 	}

// 	function img(json){
// 		var html = "";
// 		var tag = json.tag;
// 		var content = json.content;
// 		var att_str = "";
// 		var key;

// 		for (key in json.att) {
		    
// 		    if (json.att.hasOwnProperty(key)){
// 		    	var value = json.att[key];
// 		    	att_str += `${key}="${value}"`;
// 		    };
// 		}

// 		html += `
// 		<${tag} ${att_str}/>
// 		`;
// 		return html;
// 	}

	
// 	if(typeof json !== "object"){
// 		return "";
// 	}else{

// 		var _default = {
// 			"tag" : "p",
// 			"content" : "",
// 			"att" : []
// 		};

// 		var _setting = Object.assign( _default, json);
		
// 		switch( _setting.tag ){
// 			case "img":
// 				return img(json);
// 				break;
// 			default:
// 				return Normal(json);
// 				break;
// 		}

// 	}

// }
