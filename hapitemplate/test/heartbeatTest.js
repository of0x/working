"use strict";

var Lab = require("lab");
var server = require("../server.js");
var lab = exports.lab = Lab.script();
var code = require("code");


lab.test("Test for heartbeat",
  	    function(done){
    var expectedResponse = {"message":"ok"};
		var options = {method: "GET", url:"/"};
		server.inject(options, function(response){
		    var result=response.result;
		    code.expect(result).to.equal(expectedResponse);
        code.expect(response.statusCode).to.equal(200);
		    done();
		});
});
