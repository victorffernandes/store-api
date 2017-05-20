var info = require("./info");
var fs = require('fs');
var dbm = require("./dbmanager");
var cookie = require("cookie");

var GETHandler = function(path,res,req_body,req){
    console.log(path);
    switch(path){
        case '/':
            if(cookie.parse(req.headers.cookie || '') != {}){
            Load(info.paths.main,res);}
            else
            Load(info.paths.login,res);
            break;
        case '/favicon.ico':
            Load(info.paths.icon, res);
            break;
        case '/api/products/':
             dbm.GetProducts(res);
             break;
        default:
             Load(info.paths.err404,res);
    }
}

var POSTHandler = function(path,res,req_body,req_header){
    switch(path){
        case '/api/products/':
             dbm.AddProducts(res,path,req_body);
             break;
        case '/register':
             dbm.Register(res,path,req_body);
             break;
        case '/login':
            dbm.Login(res,req_body,req_header);
            break;
        default:
             Load(info.paths.err404,res);
    }
}

 var Load = function(path,res){
    fs.readFile(path,'utf-8',function(err,data){
        if(!err)
        res.end(data);
    } );
};

module.exports.POSTHandler = POSTHandler;
module.exports.GETHandler = GETHandler;

