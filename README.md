# node-walksync

[![npm version](https://img.shields.io/npm/v/@archivistnerd/walksync.svg)](https://www.npmjs.com/package/@archivistnerd/walksync)
[![build status](https://api.travis-ci.com/Archivist-Nerd/node-walksync.svg)](https://travis-ci.com/Archivist-Nerd/node-walksync.svg)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/Archivist-Nerd/node-walksync.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Archivist-Nerd/node-walksync/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Archivist-Nerd/node-walksync.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Archivist-Nerd/node-walksync/context:javascript)

Archivist Nerd's walksync Package

> A very simple option for recursivly walking the file system

## This Package is in VERY EARLY ALPHA
> This package subject to change QUICKLY, and possibly Often

## Installation

```sh
npm install --save @archivistnerd/walksync
```

## Usage (Simple)

```js
'use strict';

const walksync = require('@archivistnerd/walksync');

// List all files in current location (recursivly)
console.log( walksync('.') )
```

## Usage (Complicated)

```js
'use strict';

const fs       = require('fs')
    , walksync = require('@archivistnerd/walksync')
    ;
let totalFiles = 0
  , totalFolders = 0
  , totalFileSize = 0
  ;

function filesFn( fullpath, basepath, stats){
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
```

## License

MIT
