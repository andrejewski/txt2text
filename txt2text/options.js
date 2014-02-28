// options.js
(function() {

var noop = function() {}

var translations = function(nextValue, next) {
	var key = "translations";
	var db = chrome.storage.sync;
	if (!next) {
		next = nextValue;
		return db.get(key, function(obj) {
			next(obj[key]);
		});
	}
	obj = {};
	obj[key] = nextValue;
	db.set(obj, next);
}

var lineSeparator = '\n',
	propSeparator = '=';

var parseConfig = function(configString, next) {
	var json = {};
	configString.trim().split(lineSeparator).forEach(function(line) {
		parts = line.split(propSeparator).map(function(part) {
			return part.trim();
		});
		json[parts[0]] = parts[1];
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

var showError = function(error) {
	errors.innerHTML = error;
	var t = setTimeout(clearError, 3 * 1000);
}

var hideError = function() {
	errors.innerHTML = ''
}

translations(function(data) {
	console.log('data', data);
	config.value = stringifyConfig(data);
});

config.onkeypress = function() {
	parseConfig(config.value, function(error, json) {
		if(error) return;
		translations(json, noop);
	});
}

config.onblur = function() {
	parseConfig(config.value, function(error, json) {
		if(error) return showError(error);
		translations(json, noop);
	});
}

}).call(this);