'use strict';
const localRequire = true        //  required from ../src/package or ../.
    ;
/**
 * @test:name        @archivistnerd/walksync/test
 * @test:package     testLib
 * @test:licence     MIT
 * @test:copyright   Copyright (c) 2020 Archivist-Nerd
 */
let describe = require('@archivistnerd/testlib').describe
  , walksync = require( localRequire? '../src/walksync': '../.' )
  ;
/**
 * clear the console, and display header
 */
console.clear()
console.log('Testing: @archivistnerd/walksync\n')
/**
 * @test:Errors        Test it throws the proper errors
 */
describe( '--all errors throw errors', it=>{

  it('blank path ( should throw error )', ()=>{
    try {
      walksync()
    } catch (err) {
      return ( err.message === 'blank path')
    }
  })

  it('non-existent path ( should throw error )', ()=>{
    try {
      walksync('/arg:/boy-is/this\\a bad\\path')
    } catch (err) {
      return ( err.message.indexOf('does not exist')>0 )
    }
  })
});
/**
 * @test:Valid        Valid tests, should not throw any errors
 */
describe( '--valid functions', it=>{
  let validFiles   = filename => (filename === 'test.js' || filename === 'folder-used-for-test/file-used-for-test')
    , validFolders = filename => (filename === 'folder-used-for-test')
    ;

  it('test folder ( should not throw error )', ()=>{
    let results = walksync('./tests')
      ;
    return ( validFiles( results[0] ) && validFiles(results[1]) )
  })
  /**
   *  Callback function tests
   */
  it('callback functions: files', ()=>{
    let success = true
      , fileFn  = (filename, stats) => success? validFiles(filename):false
      , results = walksync('./tests/', fileFn)
      ;
    return success? ( validFiles( results[0] ) && validFiles(results[1]) ):false
  })

  it('callback functions: directories', ()=>{
    let success  = true
      , folderFn = (filename, stats) => success? validFolders(filename):false
      , results  = walksync('./tests/', null, folderFn)
      ;
    return success? ( validFiles( results[0] ) && validFiles(results[1]) ):false
  })

  it('depthLimit=0    ( only current folder )', ()=>{
    let results  = walksync('./tests/', null, null, 0)
      ;
    return ( results.length===1 && results[0] === 'test.js' )
  })
  it('depthLimit=1    ( only 1 sub folder deep )', ()=>{
    let success  = true
      , folderFn = (filename, stats) => success? validFolders(filename):false
      , results  = walksync('./tests/', null, folderFn, 1)
      ;
    return success? ( validFiles( results[0] ) && validFiles(results[1]) ):false
  })
});
/**
 *   output success/fail results
 */
if ( describe().length===0 )
  console.log('\n\n   *** ALL TESTS SUCCESSFUL ***');
else {
  console.log('\n\n   *** !!!SOME TESTS FAILED!!! ***')
  console.log( describe() )
  process.exit(1)
}
