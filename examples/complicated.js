'use strict';
/**
 * @example         complicated
 * @api:npm         @archivistnerd/walksync
 * @api:git         https://github.com/Archivist-Nerd/node-walksync
 * @api:Licence     MIT
 * @api:Copyright   Copyright (c) 2020 Archivist-Nerd
 */
const fs       = require('fs')
    , walksync = require('../.')
    ;
let totalFiles = 0
  , totalFolders = 0
  , totalFileSize = 0
  ;

function filesFn( fullpath, basepath, stats ){
  totalFiles++
  try {
    let filesize = fs.readFileSync( fullpath ).length
      ;
    console.log(`${filesize}\t${fullpath}`)
    totalFileSize+=filesize
  }
  // throw away error if we can't open the file
  catch (err) {}
}
function FoldersFn( fullpath, basepath, stats){
  totalFolders++
}
// List all files in current location (recursivly)
walksync('.', filesFn, FoldersFn)

console.log({
  totalFolders,
  totalFiles,
  totalFileSize
})