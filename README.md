# chunkin-wordkin

>Hurling or 'chucking' a words solely by JavaScript means for fun and profit.

## How to use

Two basic ways, synchronously and asynchronously.


```javascript
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
                out = ofst? word.charAt(0).toUpperCase() + word.slice(1): word;;
            return out;
        },
        words: ['chunktheworld!', 'worldchunkthe!']
    },
    cwSync = cw(opt1);

console.log(cwSync('chunktheworld!')) // chunk-the-world!

cw(opt2, function(camelCased) {

        console.log(camelCased); // ['chunkTheWorld!', 'worldChunkThe']
});
```

Options object takes two parameters for synchronous and three for asynchronous methods respecfully.

1. `dictionary` - array of words to being used as a basic dictionary.
2. `converter` - function to convert matched entries `word` in the position `ofst`.
3. `words` - array of words or word string to being chunked, this parameter only for asynchronious way of using.

Synchronous function, after being initiated by feeding options object into constructor, takes the same material which is passed for `words` async option.

To save time and efforts `dictionary` and `converter` options could be saved into current working directory, or any upper level directory till the root or user home directory.
