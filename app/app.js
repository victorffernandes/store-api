var http = require('http'),
    server = require("./server"),
    router = require("./router"),
    handler = require("./handler");
var init = function(){
    server.init_server(router,handler);
}

module.exports.init = init;
    
    
    
    
    
