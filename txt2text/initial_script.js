// initial_script.js
(function() {

var key = 'translations',
	db = chrome.storage.sync;

db.get(key, function(data) {

var value = data.translations;
if (value &&
    typeof value === 'object' && 
    Object.keys(value).length !== 0
) {return;}

var defaults = {
  "translations": {
    "lol": "laugh out loud",
    "omg": "oh my god",
    "wtf": "what the fuck",
    "lmao": "laugh my ass off",
    "roflmao": "rolling on the floor laughing my ass off",
    "rofl": "rolling on the floor laughing",
    "iirc": "if I recall correctly",
    "brb": "be right back",
    "k": "okay",
    "kk": "okay",
    "ttyl": "talk to you later",
    "gtfo": "get the fuck out",
    "fwiw": "for what it's worth",
    "nite": "night",
    "gnight": "goodnight",
    "tbh": "to be honest",
    "u": "you",
    "r": "are",
    "w/": "with",
    "w/o": "without",
    "bb": "baby",
    "pls": "please",
    "plz": "please",
    "ppl": "people",
    "g2g": "got to go",
    "gtg": "got to go",
    "ily": "I love you",
    "ilu": "I love you",
    "jk": "just kidding",
    "yolo": "you only live once",
    "2moro": "tomorrow",
    "2nite": "tonight",
    "btw": "by the way",
    "bff": "best friends forever",
    "bc": "because",
    "cuz": "because",
    "cya": "goodbye",
    "tl;dr": "too long; didn't read",
    "gr8": "great",
    "imo": "in my opinion",
    "imho": "in my honest opinion",
    "irl": "in real life",
    "np": "no problem",
    "nbd": "not a big deal",
    "sol": "shit out of luck",
    "tmi": "too much information",
    "atm": "at the moment",
    "eta": "estimated time of arrival",
    "ight": "alright",
    "thru": "through",
    "min": "minute",
    "mins": "minutes",
    "nan": "not a number",
    "bf": "boyfriend",
    "gf": "girlfriend",
    "idk": "I don't know",
    "idc": "I don't care",
    "ikr": "I know right",
    "ct": "can't talk",
    "txt": "text",
    "wat": "what",
    "dat": "that",
    "gj": "good job",
    "h8": "hate",
    "idgaf": "I don't give a fuck",
    "ymmv": "your mileage may vary"
  }
}

db.set(defaults);

});

}).call(this);