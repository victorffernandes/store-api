var http = require("http");
var db = require('./dbmanager');
var init_server = function (rout,hand){
    http.createServer(function(req,res){
        var req_body = '';
        res.writeHead(200, {"Content-Type": "text/html"});
        req.on('data',function(chunk){
            req_body += chunk;
        });
        req.on('end',function(){
            rout.Rout(req.method,req.url,hand,res,req_body);    
        });
    }).listen(process.env.PORT);
}

module.exports.init_server = init_server;