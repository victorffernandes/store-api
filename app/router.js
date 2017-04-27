var Rout = function(type, path, handler,res,req){
    switch(type){
        case 'POST':
            handler.POSTHandler(path,res,req);
            break;
            
        case 'GET':
            handler.GETHandler(path,res);
            break;
    }
    
}
module.exports.Rout = Rout;