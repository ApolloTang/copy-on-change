'use strict';

const path  = require('path')
const gulp  = require('gulp');
const yargs = require('yargs');
const watch = require('gulp-watch');
const s = require('shelljs');
const fs = require('fs');

// -----------------------------------------------------------
// Reading a configuration file with name: 'task-config.json'
// with the following content
//
// {
//   "watchMe":"./watchme",
//   "copyToMe":"/Users/apollotang/Desktop/target/"
// }
//
// since everyone will have a different watch/copyTo path
// so please don't check configuration into repo
//
// -----------------------------------------------------------
const file = path.resolve('./task-config.json');
let fileContent = '';
if(!fs.existsSync(file)) {
  console.log('Cannot find task-config.json');
} else {
  console.log('Reading task-config.json');
  fileContent = fs.readFileSync(file, 'utf-8');
}

const config = JSON.parse(fileContent);
const {watchMe, copyToMe} = config;

const watchedFolder_fullPath = path.resolve(watchMe);;
const distination_fullPath = path.resolve(copyToMe);;

const itemsToWatch = [
  `${watchedFolder_fullPath}/**/*`,
  `!${watchedFolder_fullPath}/**/.DS_Store`
];

gulp.task('watch', function(){
  console.log(`...watching folder: ${watchedFolder_fullPath}`);
  return watch( itemsToWatch , onChange );
});

function onChange() {
  console.log(`Folder content has changed at: ${Date()}`)
  s.rm('-rf', `${distination_fullPath}/**/*`);
  gulp.src(`${watchedFolder_fullPath}/**/*`).pipe( gulp.dest(`${distination_fullPath}/`))
}

gulp.task('default', ['watch'], function(){
    console.log('All done');
});



