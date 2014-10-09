'use strict';

var chunk = require('../src/index.js');

module.exports = {
    'base': function(test) {
        var
            word,
            chunkSync = chunk();

        test.expect(4);

        word = chunkSync('chunktheword');
        test.equal('chunkTheWord', word);

        word = chunkSync('absolutelychunkandmunkthewholeword');
        test.equal('absolutelyChunkandmunkThewholeWord', word);

        word = chunkSync(['chunktheword', 'wordthechunk']);
        test.deepEqual(['chunkTheWord', 'wordTheChunk'], word);

        word = chunkSync(['mumba', 'absolutelythewhole', 'chumba']);
        test.deepEqual(['mumba', 'absolutelyThewhole', 'chumba'], word);

        test.done();
    },
    'advanced': function(test) {
        var
            word,
            chunkSync = chunk({
                dictionary: ['chunk', 'the', 'word', 'whole', 'and', 'munk'],
                converter: function(word, ofst) {
                    var
                        out = ofst? '-' + word: word;
                    return out;
                }
            });

        test.expect(4);

        word = chunkSync('chunktheword');
        test.equal('chunk-the-word', word);

        word = chunkSync('absolutelychunkandmunkthewholeword');
        test.equal('absolutely-chunk-and-munk-the-whole-word', word);

        word = chunkSync(['chunktheword', 'wordthechunk']);
        test.deepEqual(['chunk-the-word', 'word-the-chunk'], word);

        word = chunkSync(['mumba', 'absolutelythewhole', 'chumba']);
        test.deepEqual(['mumba', 'absolutely-the-whole', 'chumba'], word);
        
        test.done();
    }
};
