var
    cw = require('chunkin-wordkin'),
    opt1 = {
        dictionary: ['chunk', 'the', 'world'],
        converter: function(word, ofst) {
            var
                out = ofst? '-' + word: word;
            return out;
        }
    },
    opt2 = {
        dictionary: ['chunk', 'the', 'world'],
        converter: function(word, ofst) {
            var
                out = ofst? word.charAt(0).toUpperCase() + word.slice(1): word;
            return out;
        },
        words: ['chunktheworld!', 'worldchunkthe!']
    },
    cwSync = cw(opt1);

console.log(cwSync('chunktheworld!')); // chunk-the-world!

cw(opt2, function(camelCased) {

        console.log(camelCased); // ['chunkTheWorld!', 'worldChunkThe!']
});
