'use strict';
var
    path = require("path"),
    fs = require("fs"),
    userdir = path.resolve(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE);
 
function search(filename, cb) {
    var
        dir = process.cwd();
 
    function traverseUp(dir) {
        var
            fullpath;

        fullpath = path.resolve(dir, filename);
        fs.exists(fullpath, function(yes) {
            var
                ndir = path.resolve(dir + '/../'),
                finalAttempt = ( ndir === dir ) || ( ndir === userdir );

            if ( yes ) {

                fs.stat(fullpath, function (err, stat) {
                    
                    if ( err ) {

                        cb(null);
                    } else if ( stat.isFile() ) {

                        cb(fullpath);
                    } else {

                        traverseUp(ndir);
                    }
                });
            } else {

                if ( finalAttempt ) {

                    cb(null); 
                } else {

                    traverseUp(ndir);
                }
            }
        });
    }

    traverseUp(dir);
}

function searchSync(filename) {
    var
        dir = process.cwd();
 
    function traverseUp(dir, next) {
        var
            fullpath,
            isExists,
            isFile,
            ndir = path.resolve(dir + '/../'),
            finalAttempt = ( ndir === dir ) || ( ndir === userdir );

        next = finalAttempt? function() { return null; }: next;

        fullpath = path.resolve(dir, filename);
        isExists = fs.existsSync(fullpath);

        if ( isExists ) {

            isFile = fs.statSync(fullpath).isFile();
            if ( isFile ) {

                next = function() {
                    return fullpath;
                };
            }
        }

        return next(ndir, next);
    }

    return traverseUp(dir, traverseUp);
}
 
module.exports = {
    search: search,
    searchSync: searchSync
};
