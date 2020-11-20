'use strict';
/**
 * @example         simple
 * @api:npm         @archivistnerd/walksync
 * @api:git         https://github.com/Archivist-Nerd/node-walksync
 * @api:Licence     MIT
 * @api:Copyright   Copyright (c) 2020 Archivist-Nerd
 */
const walksync = require('../.');

// List all files in current location (recursivly)
console.log( walksync('.') )