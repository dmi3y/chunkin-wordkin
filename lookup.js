/*jshint node:true*/
var
    path = require("path"),
    fs = require("fs"),
    userdir = path.resolve(process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE),
    out;
 
function lookup(filename, cb) {
    var
        dir = process.cwd();
 
    (function traverseUp(dir, isNext) {
        var
            fullpath;

        if ( isNext ) {

            fullpath = path.resolve(dir, filename);
            fs.exists(fullpath, function(yes) {
                var
                    ndir = path.resolve(dir + '/../'),
                    isNext = ( ndir !== dir ) && ( ndir !== userdir );

                if ( yes ) {

                    fs.stat(fullpath, function (err, stat) {
                        
                        if ( stat && stat.isFile() ) {

                            cb(fullpath);
                        } else {

                            traverseUp(ndir, isNext);
                        }
                    });
                } else {

                    traverseUp(ndir, isNext);
                }
            });
        } else {

            cb(null);
        }

    }(dir, true));
}
 
module.exports = lookup;