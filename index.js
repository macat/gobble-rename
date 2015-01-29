var path = require( 'path' ),
    sander = require( 'sander' ),
    path = require( 'path' ),
    fs = require('graceful-fs'),
    symlinkOrCopy = require( 'symlink-or-copy' ).sync;

module.exports = rename;
function rename(inputdir, outputdir, options, callback) {
  function processdir (dir, cb) {
    fs.readdir(dir, function (err, files) {
      var remaining = files.length, result = [], check;
      if (err) return cb(err);
      // Empty dir?
      if (!remaining) { cb(null, result); }
      check = function () {
        if (!--remaining) { cb(null, result); }
      };

      function handleResult (err) {
        if (err) return cb(err);
        check();
      }

      files.forEach(function (filename) {
        var filepath = dir + path.sep + filename;
        var destpath = filepath.replace(inputdir, outputdir)
                               .replace(options.from, options.to);
        fs.stat(filepath, function (err, stats) {
          if (err) return cb( err );
          if ( stats.isDirectory() ) {
            processdir(filepath, handleResult);
          } else {
            sander.mkdirSync(path.dirname(destpath));
            try {
              symlinkOrCopy(filepath, destpath);
              check();
            } catch (e) {
              cb(e);
            }
          }
        });
      })
    });
  };
  processdir(inputdir, callback);
}

