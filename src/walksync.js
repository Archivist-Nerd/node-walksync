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
 * @api:Param   {Number}    DepthLimit - Maximum depth of children directories to search
 *                                      -1 (Unlimited)
 *                                       0 (no children)
 *
 * @api:Example:
 *      walksync('/home/archivistnerd/')
 */
module.exports = function walksync( base='', fileFn, pathFn, depthLimit=-1 ){
  if ( !base.length )         throw new Error('blank path')
  if ( !fs.existsSync(base) ) throw new Error(`Path "${base}" does not exist`)

  let files   = []
    , folders = [ 
                  ['', '', depthLimit]
                ]
    ;
  base = base.replace('\\','/') + ( (base.substr(-1)!=='/')? '/':'' )

  while (folders.length){
    let details  = folders.shift()
      , path     = details[1]
      , depth    = details.pop()
      , fullPath = (base+path).replace('\\','/')
      ;
    if ( path !== '' && isFunction(pathFn) ) pathFn( ...details )

    fs.readdirSync( fullPath )
      .forEach( file => {
        let stats = fs.statSync( fullPath+file )
          ;
        // check if file is a directory
        if ( stats.isDirectory() ) return (depth!==0)? folders.push( [fullPath+file, path+file+'/', stats, depthLimit-1 ] ):0
        // check for callback function
        if ( isFunction(fileFn) ) fileFn(fullPath+file, path+file, stats)
        files.push( path+file )
      });
  }

  return files
}