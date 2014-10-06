var
	config = require('./chunkfile.js'),
	chunkDictionary = require('./chunkDictionary.js');

function getLength(str) {
	var
		maxWrd;

	maxWrd = str.split(/\[\d+:\d+\]/g).reduce(function(a, b){
		return a > b? a: b;
	});

	return maxWrd.length;
}

function chunkin(ds, converter, wordkin) {
	var
		wlen = getLength(wordkin),
		ix,
		ixs;

	function nextIx() {

		return ixs.shift();
	}

	function dicing(wrd, ix) {
		var
			chunk,
			dic = ds[ix],
			dlen = dic.length,
			rep,
			lace,
			len = 0,
			nix;

		for ( ;dlen--; ) {

			chunk = dic[dlen];
			if ( wrd.indexOf(chunk) >= 0 ) {

				rep = new RegExp(chunk, 'g');
				lace = '[' + ix + ':' + dlen + ']';
				wrd = wrd.replace(rep, lace);
				len = getLength(wrd);

				if ( len < ix ) {
					break;
				}
			}
		}


		nix = nextIx();
		if ( nix >= ds.min ) {

			wrd = dicing(wrd, nix);
		}
		return wrd;
	}

	if ( wlen >= ds.min ) {

		wlen = Math.min(wlen, ds.max);
		ixs = ds.ixs.slice();
		ix = nextIx();

		wordkin = dicing(wordkin, ix);
	}

	function convert(zzz, x, y, ofst) {
		var
			word = ds[x][Number(y)];

		return converter(word, ofst);
	}

	return wordkin.replace(/\[(\d+):(\d+)\]/g, convert);
}

function core(ds, cv, words) {
	var
		len,
		word,
		out;


	if ( Array.isArray(words) ) {

		out = [];
		len = words.length;
		for ( ;len--; ) {

			word = words[len];
			out.shift(chunkin(ds, cv, word));
		}
	} else {

		word = words;
		out = chunkin(ds, cv, word);
	}

	return out;
}

function init(dictionary, converter) {
	var
		dict = dictionary || config.dictionary,
		conv = converter || config.converter,
		dictionaries,
		out = 'no way';


	if ( dict && conv ) {

		dictionaries = chunkDictionary(dict);
		out = core.bind(null, dictionaries, conv);
	}

	return out;
}

cm = init();
cm('chunktheworld');

module.exports = init;
