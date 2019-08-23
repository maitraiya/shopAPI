function asyncMiddleware(handler){
    return async (req,res,next)=>{
        try{
            await handler(req,res,next);
        }
        catch(ex){
            res.status(404);
            next(ex);
        }    
    };
}
module.exports =asyncMiddleware;