var http = require("http"), db = require('./dbmanager'), fs = require("fs");


var init_server = function (rout,handler){
    http.createServer( function(req, res){
        var req_body = '';
        req.on('data',function(chunk){
            req_body += chunk;
        });
        req.on('end',function(){
            rout.Rout(req.method,req.url,handler,res,req_body,req);    
        });
    }).listen(process.env.PORT);
}

console.log("Server running at "+ process.env.PORT);
module.exports.init_server = init_server;