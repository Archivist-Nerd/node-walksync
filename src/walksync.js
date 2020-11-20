'use strict';
/**
 * @api             walksync
 * @api:npm         @archivistnerd/walksync
 * @api:git         https://github.com/Archivist-Nerd/node-walksync
 * @api:Licence     MIT
 * @api:Copyright   Copyright (c) 2020 Archivist-Nerd
 *
 *
 * @api:Example:
 *      const walksync = require('@archivistnerd/walksync');
 */
 const fs = require('fs')
     , isFunction = fn => typeof fn === 'function'
     ;
/**
 * @api:name    walksync    file system walking function
 * @api:group   functions
 *
 * @api:Param   {String}    folder to start walking
 *
 * @api:Param   {Function}  called on every file
 *                          function( fullPath, commonPath, fs.stat )
 *
 * @api:Param   {Function}  called on every directory
 *                          function( fullPath, commonPath, fs.stat )
 *
 * @api:Example:
 *      walksync('/home/archivistnerd/')
 */
module.exports = function walksync( base='', fileFn, pathFn ){
  if ( !base.length ) throw new Error('blank path')
  if ( !fs.existsSync(base) ) throw new Error(`Path "${base}" does not exist`)

  base = base.replace('\\','/')
  if (base.substr(-1)!=='/') base+= '/'

  let files = []
    ;

  function walk( path='', fullPath=(base+path), folders=[] ){
    fullPath = fullPath.replace('\\','/')
    if (fullPath.substr(-1)!=='/') fullPath+= '/'

    fs.readdirSync( fullPath )
      .forEach( file => {
        let stats = fs.statSync( fullPath+file )
          ;
        // check if file is a directory
        if ( stats.isDirectory() ) return folders.push( [fullPath+file, path+file, stats] )
        // is a file check for callback function
        if ( isFunction(fileFn) ) fileFn(fullPath+file, path+file, stats)
        files.push( path+file )
      });

    folders.forEach( details => {
        if ( isFunction(pathFn) ) pathFn( ...details )
        walk( details[1]+'/' )
      })
  }

  walk()

  return files
}