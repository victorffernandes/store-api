var mysql = require('mysql'), url = require("url"), qs = require('querystring'), fs = require('fs'), info = require("./info"), 
crypto = require('crypto'), cookie = require('cookie');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'zappknight',
  password : '',
  database : 'c9'
});

  var GetProducts = function(res){
     connection.query('SELECT * FROM Products',function (err,fields, rows){
       if(!err)
        res.end(JSON.stringify(fields));
        else 
        res.end("Problem with db connection");
     });
  }
  
  var Login = function(res,req_body,req){
     var param = qs.parse(req_body);
     var p = crypto.createHash('md5').update(param.Password).digest("hex");
     connection.query('SELECT * FROM Users WHERE Username = ? AND Password = ?',[param.Username,p],function (err,fields, rows){
       if(!err){
        var c = cookie.serialize('Username',param.Username);
        
        res.setHeader('Set-Cookie', c, {
              httpOnly: true,
              maxAge: 60 * 60 * 24 * 7 });
        res.writeHead(302, {"Content-Type": "text/html"});
        Load(info.paths.main,res);
        }
        else 
        res.end("Problem with db connection");
     });
  }
  
  var AddProducts = function(res,path,req_body){
    var param = qs.parse(req_body);
    connection.query('INSERT INTO Products (Name, Price) VALUES (? , ?)', [param.Name , param.Price],function (err,fields, rows){
       if(!err){
        res.writeHead(301, {Location: 'http://store-api-zappknight.c9users.io/'});
        Load(info.paths.main,res);
       }
        else 
        res.end("Error in your db");
     });
  }
  
  var Register = function(res,path,req_body){
    var param = qs.parse(req_body);
    var p = crypto.createHash('md5').update(param.Password).digest("hex");
    if(param.Password == param.PasswordCheck){
    connection.query('INSERT INTO Users (Username, Password) VALUES (? , ?)', [param.Username , p ],function (err,fields, rows){
       if(!err){
        res.writeHead(301, {Location: 'http://store-api-zappknight.c9users.io/'});
        res.write("Registered new User!");
       }
        else 
        res.end("Error in your db" + err);
     });
    }
    else
    res.end("Passwords do not match!");
  }
  
  
  var Load = function(path,res){
    fs.readFile(path,'utf-8',function(err,data){
        if(!err)
        res.end(data);
    } );
};
  
module.exports.GetProducts = GetProducts;
module.exports.AddProducts = AddProducts;
module.exports.Register = Register;
module.exports.Login = Login;