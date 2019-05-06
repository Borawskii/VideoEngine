var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path_util = require('path');

const util = require('./app_util.js')
util.setup(__dirname + '/media/video');
util.uploadVideos(__dirname + '/media');

var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
  res.render('media', {qs: req.query});
});

app.get('/contact', (req, res) => {
  res.send('GitHub: https://github.com/Borawskii/VideoEngine');
});

app.get('/video', (req, res) => {
  var id = req.query.search;
  var beginningChar = id.charAt(0) + '';

  if(!isNaN(beginningChar)) {
    beginningChar = '#';
  }

  fs.readdir(__dirname + '/media/video/' + beginningChar + '', (error, files) => {
    var found = false;
    files.forEach(file => {
      if(found) {
        return;
      }

      var name = path_util.basename(file);
      if(name.includes(id)) {
        console.log('Found %s', name);

        const path = 'media/video/' + beginningChar + '/' + name;
        const stat = fs.statSync(path)
        const fileSize = stat.size
        const range = req.headers.range
        if (range) {
          const parts = range.replace(/bytes=/, "").split("-")
          const start = parseInt(parts[0], 10)
          const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1
          const chunksize = (end-start)+1
          const file = fs.createReadStream(path, {start, end})
          const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
          }
          res.writeHead(206, head);
          file.pipe(res);
          found = true;
        } else {
          const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
          }
          res.writeHead(200, head)
          fs.createReadStream(path).pipe(res)
          found = true;
        }
      }
    });

    if(!found) {
      res.render('na', {qs: req.query});
    }

  });
});

app.get('/search', (req, res) => {
  res.render('media', {qs: req.query});
});

app.listen(3000);
