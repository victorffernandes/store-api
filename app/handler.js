var info = require("./info");
var fs = require('fs');
var dbm = require("./dbmanager");

var GETHandler = function(path,res){
    console.log(path);
    switch(path){
        case '/':
            Load(info.paths.main,res);
        case '/ajax_info.txt':
            Load(info.paths.ajax_info, res);
            break;
        case '/favicon.ico':
            Load(info.paths.icon, res);
            break;
        case '/api/products/':
             dbm.GetProducts(res);
             break;
        default:
             console.log('Thats default');
    }
}

var POSTHandler = function(path,res,req){
    switch(path){
        case '/api/products/':
             dbm.AddProducts(res,req);
             break;
        default:
             console.log('Thats default on Post');
    }
}

var Load = function(path,res,cb){
    fs.readFile(path,'utf-8',function(err,data){
        if(!err)
        res.end(data);
    } );
};

module.exports.POSTHandler = POSTHandler;
module.exports.GETHandler = GETHandler;

