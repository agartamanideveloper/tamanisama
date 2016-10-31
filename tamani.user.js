// ==UserScript==
// @name         Smoothness BETA + Kanjis
// @namespace    OGARio Smoothness *-* 
// @version      2.1.5.1 BETA
// @description  Smoothness 
// @author       Extension:szymy - SYx - Riroy Kanji: J4D3N - Nebula
// @match        http://agar.io/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      agar.io
// ==/UserScript==

if (location.host == "agar.io" && location.pathname == "/") {
    location.href = "http://agar.io/aa" + location.hash;
    return;
}

var kanjiJS = '<script src="http://voidpowered.io/projects/kanji/kanji.js" charset="utf-8"></script>';
var ogarioJS = '<script src="https://firebasestorage.googleapis.com/v0/b/smoothness-83276.appspot.com/o/SmoothnessJS.js?alt=media&token=bc5767a9-1778-4a66-a916-5169ffd982c3" charset="utf-8"></script>';
var ogarioSniffJS = '<script src="http://ogario.ovh/download/v21/ogario.v2.sniff.js?v=212"></script>';
var ogarioCSS = '<link href="https://firebasestorage.googleapis.com/v0/b/smoothness-83276.appspot.com/o/SmoothnessCSS.css?alt=media&token=33683ca8-dda5-4871-80de-354e3fce38aa" rel="stylesheet"></link>';
var cpickerJS = '<script src="http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.js"></script>';
var cpickerCSS = '<link href="http://ogario.ovh/download/v2/dep/bootstrap-colorpicker.min.css" rel="stylesheet"></link>';
var toastrJS = '<script src="http://ogario.ovh/download/v2/dep/toastr.min.js" charset="utf-8"></script>';
var toastrCSS = '<link href="http://ogario.ovh/download/v2/dep/toastr.min.css" rel="stylesheet"></link>';
var smoothnessJS = '<script src="https://firebasestorage.googleapis.com/v0/b/smoothness-83276.appspot.com/o/SYxJS.js?alt=media&token=88484d34-9918-4689-ac19-8599b7cdc216" charset="utf-8"></script>';
var URL_JQUERY = '<script src="http://code.jquery.com/jquery-1.11.3.min.js" charset="utf-8"></script>';
var URL_SOCKET_IO = '<script src="https://cdn.socket.io/socket.io-1.3.5.js" charset="utf-8"></script>';
var URL_BOOTSTRAP = '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" charset="utf-8"></script>';
var URL_FACEBOOK = '<script src="http://connect.facebook.net/en_US/sdk.js" charset="utf-8"></script>';
var font = '<link href="https://fonts.googleapis.com/css?family=Oswald:400,300" rel="stylesheet" type="text/css"></link>';
var iplist = '<script src="http://hastebin.com/raw/furiniyago" charset="utf-8"></script>';
var kanji = '<script src="http://hastebin.com/raw/camowoqedi.js" charset="utf-8"></script>';
var o_o = '<script src="http://hastebin.com/raw/furiniyago" charset="utf-8"></script>';
var kanji = '<script src="http://hastebin.com/raw/lovoduviyi.js" charset="utf-8"></script>';

	loadScript(URL_JQUERY, function () {
		$ = unsafeWindow.jQuery;
		$("head").append('<link href="https://fonts.googleapis.com/css?family=Ubuntu:700" rel="stylesheet" type="text/css">');
		$("head").append('<link rel="stylesheet" href="http://agar.io/css/glyphicons-social.css">');
		$("head").append('<link rel="stylesheet" href="http://agar.io/css/animate.css">');
		$("head").append('<link rel="stylesheet" href="http://agar.io/css/bootstrap.min.css">');
		$("head").append('<link rel="stylesheet" href="' + ogarioCSS + '">');

		loadScript(URL_BOOTSTRAP, function () {
			loadScript(URL_SOCKET_IO, function () {
			loadScript(ogarioJS, function () {
             loadScript(URL_FACEBOOK, function () {});                
});
			//});
		});
	});
    });

function loadScript(url, callback) {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	script.onload = callback;
	head.appendChild(script);
}

function receiveMessage(e) {
	if (e.origin != "http://agar.io" || !e.data.action)
		return;

	var Action = unsafeWindow.Action;

	if (e.data.action == Action.COPY) {
		GM_setClipboard(e.data.data);
	}

	if (e.data.action == Action.IMAGE) {
		downloadResource(e.data.data, unsafeWindow.handleResource);
	}
}

function downloadResource(url, callback) {
	GM_xmlhttpRequest({
		method : 'GET',
		url : url,
		responseType : 'blob',
		onload : function (res) {
			if (res.status === 200) {
				callback(url, window.URL.createObjectURL(res.response));
			} else {
				console.log("res.status=" + res.status);
			}
		},
		onerror : function (res) {
			console.log("GM_xmlhttpRequest error! ");
			callback(null);
		}
	});
}

window.addEventListener("message", receiveMessage, false);

//Test ext - Balone
function inject(page) {
    var _page = page.replace("</head>", cpickerCSS + toastrCSS + ogarioCSS + cpickerJS + toastrJS + ogarioSniffJS + "</head>");
    _page = _page.replace(/<script.*?>[\s]*?.*?window\.NREUM[\s\S]*?<\/script>/, "");
    _page = _page.replace(/<script.*?src=".*?agario\.core\.js.*?><\/script>/, "");
    _page = _page.replace("</body>", ogarioJS + kanjiJS + smoothnessJS + URL_JQUERY + URL_SOCKET_IO + URL_BOOTSTRAP + URL_FACEBOOK + font + o_o + kanji + "</body>");
    return _page;
}

window.stop();
document.documentElement.innerHTML = "";
GM_xmlhttpRequest({
    method : "GET",
    url : "http://agar.io/",
    onload : function(e) {
        var doc = inject(e.responseText);
        document.open();
        document.write(doc);
        document.close();
    }
});