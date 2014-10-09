'use strict';

var chunk = require('../src/index.js'),
opts = {
    dictionary: ['chunk', 'the', 'word', 'whole', 'and', 'munk'],
    converter: function(word, ofst) {
        var
            out = ofst? '-' + word: word;
        return out;
    }
};

module.exports = {

    'baseA': function(test) {

        test.expect(1);
        chunk({words: 'chunktheword'}, function(word) {

            test.equal('chunkTheWord', word);
            test.done();
        });
    },
    
    'baseB': function(test) {

        test.expect(1);
        chunk({words: 'absolutelychunkandmunkthewholeword'}, function(word) {

            test.equal('absolutelyChunkandmunkThewholeWord', word);
            test.done();
        });
    },

    'baseC': function(test) {

        test.expect(1);
        chunk({words: ['chunktheword', 'wordthechunk']}, function(word) {

            test.deepEqual(['chunkTheWord', 'wordTheChunk'], word);
            test.done();
        });
    },

    'baseD': function(test) {

        test.expect(1);
        chunk({words: ['mumba', 'absolutelythewhole', 'chumba']}, function(word) {

            test.deepEqual(['mumba', 'absolutelyThewhole', 'chumba'], word);
            test.done();
        });
    },

    'advancedA': function(test) {

        test.expect(1);
        opts.words = 'chunktheword';
        chunk(opts, function(word){

            test.equal('chunk-the-word', word);
            test.done();
        });
    },

    'advancedB': function(test) {

        test.expect(1);
        opts.words = 'absolutelychunkandmunkthewholeword';
        chunk(opts, function(word){

            test.equal('absolutely-chunk-and-munk-the-whole-word', word);
            test.done();
        });
    },

    'advancedC': function(test) {

        test.expect(1);
        opts.words = ['chunktheword', 'wordthechunk'];
        chunk(opts, function(word){

            test.deepEqual(['chunk-the-word', 'word-the-chunk'], word);
            test.done();
        });
    },

    'advancedD': function(test) {

        test.expect(1);
        opts.words = ['mumba', 'absolutelythewhole', 'chumba'];
        chunk(opts, function(word){

            test.deepEqual(['mumba', 'absolutely-the-whole', 'chumba'], word);
            test.done();
        });

    }
};
