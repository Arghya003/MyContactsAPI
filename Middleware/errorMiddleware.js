const {constants}=require("../contants")

const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode?res.statusCode:500;
   switch(statusCode){
    case constants.VALIDATION_ERROR:
        res.json({
            title:"Validation Failed",
            message:err.message,
            stackTree:err.stack,
        });
        break;

    case constants.NOT_FOUND:
            res.json({
                title:'not Found',
                message:err.message,
                stackTree:err.stack

            })
        break;
    case constants.UNAUTHORIZED:
        res.json({
            title:"Un authorzed",
            message:err.message,
            stackTree:err.stack,
        })
        break;
    case constants.FORBIDDEN:
        res.json({
            message:err.message,
            title:"Forbidden",
            stackTree:err.stack
        })
        break;
        case constants.SERVER_ERROR:
            res.json({
                title:"Server Error",
                message:err.message,
                stackTree:err.stack
            })
            break;
    default:
        console.log("No error! All set");
        break;
   }

}

module.exports=errorHandler;