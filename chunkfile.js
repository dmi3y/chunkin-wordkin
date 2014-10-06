module.exports = {
	dictionary: ['chunk', 'the', 'world'],
	converter: function(word, ofst) {
		var
			out = ofst? word.charAt(0).toUpperCase() + word.slice(1): word;
		return out;
	}
};