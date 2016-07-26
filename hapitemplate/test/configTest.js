"use strict";

var Lab = require("lab");
var lab = exports.lab = Lab.script();
var code = require("code");


lab.test("Test for config.js",
  	    function(done){

          //copy/paste from localhost.json
          var expectedResponse = {
            "host": "localhost",
            "port": 8889
          };

          var result=require("../src/server/conf/config.js");;
          code.expect(result).to.equal(expectedResponse);
          done();
        }
      );
