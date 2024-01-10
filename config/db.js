const mongoose=require("mongoose");
require("dotenv").config()
const connectDB=async()=>{
    try{
        const connect=await  mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,

        });
        console.log("database connected",connect.connection.host,connect.connection.name);

    }
    catch(e){
        console.log(e)
    }
}

module.exports=connectDB