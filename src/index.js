'use strict';
var
    chunkDictionary = require('./chunkDictionary.js'),
    lup = require('searchup');

function getLength(str) {
    var
        maxWrd;

    maxWrd = str.split(/\[\d+:\d+\]/g).reduce(function(a, b){
        return a > b? a: b;
    });

    return maxWrd.length;
}

function core(ds, converter, word) {
    var
        wlen = getLength(word),
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

        word = dicing(word, ix);
    }

    function convert(zzz, x, y, ofst) {
        var
            word = ds[x][Number(y)];

        return converter(word, ofst);
    }

    return word.replace(/\[(\d+):(\d+)\]/g, convert);
}

function base(ds, cv, words) {
    var
        len,
        word,
        out;


    if ( Array.isArray(words) ) {

        out = [];
        len = words.length;
        for ( ;len--; ) {

            word = words[len];
            out.unshift(core(ds, cv, word));
        }
    } else {

        word = words;
        out = core(ds, cv, word);
    }

    return out;
}

function getOut(a, path, isSync) {
    var
        words,
        conf = path && require(path),
        dict,
        opt = a || {},
        conv,
        dictionaries,
        out = 'Bad options.',
        goon;

    if ( opt || conf ) {

        dict = opt.dictionary || conf.dictionary;
        conv = opt.converter || conf.converter;
        words = opt.words;
        goon = words || isSync;

        if ( dict && conv && goon ) {

            dictionaries = chunkDictionary(dict);
            out = isSync? base.bind(null, dictionaries, conv): base(dictionaries, conv, words);
        }
    }

    return out;
}

function init(a, b) {
    var
        out,
        path;

    if ( typeof b === 'function' ) {

        lup.search('chunkfile.js', function(path) {

            out = getOut(a, path);
            b(out);
        });

    } else {

        path = lup.searchSync('chunkfile.js');

        out = getOut(a, path, true);
        return out;
    }


}

module.exports = init;
