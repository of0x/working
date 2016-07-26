"use strict";

var path = require('path');
var os = require('os');
var fs = require('fs');

/* $lab:coverage:off$ */
var hostname = "localhost" || process.env.LS_ENV;
/* $lab:coverage:on$ */

var filespec = path.join( __dirname, "env/"+ hostname +".json");

var Config = require(filespec);

console.log( "Using the following configuration:" );
console.log( Config );

module.exports = Config;
