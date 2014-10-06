module.exports = function (/*array*/dictionary) {
	var
		len = dictionary.length,
		dictionaries = {},
		min = dictionary[0].length,
		max = 0,
		it,
		itLen,
		indexes = [];

	for ( ;len--; ) {

		it = dictionary[len];
		itLen = it.length;
		min = Math.min(min, itLen);
		max = Math.max(max, itLen);

		if ( !dictionaries[itLen] ) {

			dictionaries[itLen] = [];
			indexes.push(itLen);
		}
		dictionaries[itLen].push(it);
	}

	indexes.sort(function(a, b){
		return b - a;
	});

	dictionaries.max = max;
	dictionaries.min = min;
	dictionaries.ixs = indexes;

	return dictionaries;
};
