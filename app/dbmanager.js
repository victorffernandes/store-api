//INSERT INTO Products VALUES (null,'Pencil','1.00')
//SELECT * from Products
var mysql      = require('mysql');
var url = require("url");
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
  
  var AddProducts = function(res,req){
      var r = url.parse(req,true).query;
      console.log("Rada " + r.name);
      res.end();
  }
  
module.exports.GetProducts = GetProducts;
module.exports.AddProducts = AddProducts;