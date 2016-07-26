"use strict";

var Lab = require("lab");
var server = require("../server.js");
var lab = exports.lab = Lab.script();
var code = require("code");


lab.experiment("test routes and functionality", () => {

  var expectedResponse = "1";

  lab.beforeEach((done) => {
    //put some values in the stack
    var options = {method: "PUT", url:"/stack", payload:expectedResponse};
    server.inject(options, function(response){
      code.expect(response.statusCode).to.equal(200);
    });
    done();
  });

  lab.test("getting an item without an ID (top of the stack)",
    	    function(done){
      var getOpts = {method: 'GET', url:"/stack"}
      server.inject(getOpts, function(response) {
        code.expect(response.statusCode).to.equal(200);
        code.expect(response.payload).to.equal(expectedResponse);
        done();
      });
  });


  lab.test("get an item by id",
    	    function(done){
      var getOpts = {method: 'GET', url:"/stack?ID=0"}
      server.inject(getOpts, function(response) {
        code.expect(response.statusCode).to.equal(200);
        code.expect(response.payload).to.equal(expectedResponse);
        done();
      });
  });

  lab.test("put with empty payload fails", function(done){
    var options = {method: "PUT", url:"/stack", payload:null};
    server.inject(options, function(response){
      code.expect(response.statusCode).to.equal(400);
    });
    done();
  });

  lab.test("get can't get an item by ID if the ID is negative",
            function(done){
      var getOpts = {method: 'GET', url:"/stack?ID=-1"}
      server.inject(getOpts, function(response) {
        code.expect(response.statusCode).to.equal(400);
        done();
      });
  });

  lab.test("get can't get an item by ID if the ID is larger than the stack size",
            function(done){
      var getOpts = {method: 'GET', url:"/stack?ID=100"}
      server.inject(getOpts, function(response) {
        code.expect(response.statusCode).to.equal(400);
        done();
      });
  });

});
