var Rout = function(type, path, handler,res,req_body,req){
    switch(type){
        case 'POST':
            handler.POSTHandler(path,res,req_body,req);
            break;
            
        case 'GET':
            handler.GETHandler(path,res,req_body,req);
            break;
    }
    
}
module.exports.Rout = Rout;