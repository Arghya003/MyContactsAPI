const express=require("express");
const app=express();
const connectDB=require("./config/db")


const dotenv=require("dotenv");

const errorHandler = require("./Middleware/errorMiddleware");
dotenv.config();
connectDB();
const PORT=3000||process.env.PORT;

app.use(express.json())
app.use(errorHandler)
app.use("/api/contacts",require("./routes/contactRoute"))
app.use("/api/users", require("./routes/userRoute"));

app.listen(PORT,()=>{
    console.log(`listening to http://loacalhost:${PORT}`)
})
