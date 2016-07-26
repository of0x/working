"use strict";

var Hapi = require("hapi");
var server = new Hapi.Server();
var Config = require("./conf/config.js");
var stack = [];

server.connection({ port: Config.port });

var check = function (request, reply) {
  reply({message: "ok"});
};


var putThing = function(request, reply) {
  if (!request.payload) {
    reply("Empty payload").code(400);
    return;
  }
  stack.push(request.payload);
  reply().header('ETag', stack.length-1);
  return;
}

var getThing = function(request, reply) {

  var value = null;

   var index;
   //error conditions if there is a query string...
   if (!request.query.ID) { //query string must include an ID
     value = stack.pop();
     reply(value);
     return;
   } else {
     index = request.query.ID;
     if ((index>stack.length) || (index<0)) {
       reply("No  value for ID: "+index).code(400);
       return;
     }
   }
   // get that item, & leave the stack unchanged
   value = stack[index];
   reply(value);

   return;
}

server.route({ method: "GET", path: "/", handler: check });
server.route({ method: "PUT", path: "/stack", handler: putThing });
server.route({ method: "GET", path: "/stack", handler: getThing });

const plugins = [
    require('./logger')
];

server.register(plugins, function( err ) {
  console.log("registered plugins");
});

server.start();
console.log("server http://"+Config.host+":"+Config.port);
module.exports = server;
