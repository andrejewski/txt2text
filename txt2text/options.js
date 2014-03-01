// options.js
(function() {

var noop = function() {}

var translations = function(nextValue, next) {
	var key = "translations",
		db = chrome.storage.sync;
	if (!next) {
		next = nextValue;
		return db.get(key, function(obj) {
			next(obj[key]);
		});
	}
	var obj = {};
	obj[key] = nextValue;
	db.set(obj, next);
}

var lineSeparator = '\n',
	propSeparator = '=';

var parseConfig = function(configString, next) {
	var json = {};
	configString.trim().split(lineSeparator).forEach(function(line) {
		var parts = line.split(propSeparator).map(function(part) {
			return part.trim();
		});
		var txt = parts[0],
			text = parts[1];
		if(txt && text) {
			json[txt] = text;
		}
	});
	next(null, json);
}

var stringifyConfig = function(configJSON) {
	var txt, text, lines = [];
	for(txt in configJSON) {
		text = configJSON[txt];
		lines.push(txt+' '+propSeparator+' '+text);
	}
	return lines.join(lineSeparator);
}

var config = document.getElementById("config"),
	errors = document.getElementById("errors");

var hideError = function() {
	errors.innerHTML = '';
}

var showError = function(error) {
	errors.innerHTML = error;
	var t = setTimeout(hideError, 3 * 1000);
}

translations(function(data) {
	config.value = stringifyConfig(data);
});

config.oninput = (function(current) {
 	return function() {
		parseConfig(config.value, function(error, json) {
			if(error) return;
			if(JSON.stringify(current) === JSON.stringify(json)) return;
			current = json;
			translations(json, noop);
		});
	}
})({});

config.onblur = function() {
	parseConfig(config.value, function(error, json) {
		if(error) return showError(error);
		translations(json, noop);
	});
}

}).call(this);
