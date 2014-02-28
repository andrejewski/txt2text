
handleRegexes(function(handleText) {
	walk(document.body);

	function walk(node) {

		// I stole this function from here:
		// http://is.gd/mwZp7E

		// I then stole said function from here: (-Chris)
		// http://goo.gl/9cFNIs

		var child, next;

		switch ( node.nodeType )  
		{
			case 1:  // Element
			case 9:  // Document
			case 11: // Document fragment
				child = node.firstChild;
				while ( child ) 
				{
					next = child.nextSibling;
					walk(child);
					child = next;
				}
				break;

			case 3: // Text node
				handleText(node);
				break;
		}
		
	}
});

function gex(string) {
	return new RegExp("\\b"+string+"\\b", "g");
}

function handleRegexes(next) {
	return chrome.storage.sync.get('translations', function(obj) {
		var key, transforms = [];
		translations = obj.translations;
		for(key in translations) {
			transforms.push((function(txt, text) {
				var txtCap = txt.charAt(0).toUpperCase(),
					textCap = text.charAt(0).toUpperCase();
				var lower = gex(txt),
					caps = gex(txtCap+txt.slice(1)),
					upper = gex(txt.toUpperCase());
				return function(v) {
					// console.log('v:', v, txt, text);
					v = v.replace(lower, text);
					v = v.replace(caps, textCap+text.slice(1));
					v = v.replace(upper, text);
					return v;
				}
			})(key, translations[key]));
		}

		return next(function(textNode) {
			var text = textNode.nodeValue;
			if(!text.trim()) {return;}
			textNode.nodeValue = transforms.reduce(function(p, c) {
				return c(p);
			}, text);
		});
	});
}
