const fs = require('fs');
const path = require('path');

module.exports.setup = function(dir) {
  var i = 65;
  var j = 91;

  for(k = i; k < j; k++) {
    var letter = String.fromCharCode(k);
    if(!fs.existsSync(dir + '/' + letter)) {
      fs.mkdirSync(dir + '/' + letter);
    }
  }
}

module.exports.uploadVideos = function(dir) {
  fs.readdir(dir + '/upload', function(err, files) {
    if(err) {
      console.log('Could not re-upload files to directories');
    }

    files.forEach((file, index) => {
      var filename = path.basename(file);
      console.log(filename);

      var from = dir + '/upload';
      var to = dir + '/video/' + filename.charAt(0).toUpperCase();
      console.log(to);

      var beginningChar = filename.charAt(0);
      if(!isNaN(beginningChar)) {
        to = dir + '/video/#';
      }

      var fromPath = path.join(from, file);
      console.log(fromPath);
      var toPath = path.join(to, file);
      console.log(toPath);
      fs.rename(fromPath, toPath, (error) => {
          if(error) {
            console.log(error);
          } else {
            console.log("Uploaded '%s' to '%s'.", fromPath, toPath);
          }
      });
    });
  });
}
