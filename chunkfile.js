'use strict';
module.exports = {
    dictionary: ['chunk', 'the', 'word'],
    converter: function(word, ofst) {
        var
            out = ofst? word.charAt(0).toUpperCase() + word.slice(1): word;
        return out;
    }
};
