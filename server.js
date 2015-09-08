var fs = require('fs');
var youtubedl = require('youtube-dl');
var video = youtubedl('http://www.youtube.com/watch?v=zZjSX01P5dE',
  // Optional arguments passed to youtube-dl. 
  ['--format=171']); //18=>mp4 340 | 171=>audio

var size = 0;
var pos = 0;
video.on('info', function(info){
    size = info.size;
    console.log(info);
});
// Will be called when the download starts. 
video.on('data', function(data) {
    // console.log(data);
    pos += data.length;
    // `size` should not be 0 here.
    if (size) {
        var percent = (pos / size * 100).toFixed(2);
        console.log(percent);
    }
});

// video.pipe(function(f,j){
//     console.log(f);
//     console.log(j);
// });
video.on('end', function() {
  console.log('FINAL');
});

video.pipe(fs.createWriteStream('mymp3.mp3'));