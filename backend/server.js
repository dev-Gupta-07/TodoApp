const express=require("express")
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const todoRoute=require("./routes/todoRoute")
const path=require('path')
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app=express();
app.use(express.json())
dotenv.config()
connectDB()


app.use("/api/user", userRoute);
app.use("/api/do", todoRoute);

const __dirname1=path.resolve();

if(process.env.NODE_ENV==="development")
{
   app.use(express.static(path.join(__dirname1,"../frontend/to-do-app/build")))
   app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname1,"../frontend","to-do-app","build","index.html"))
   });
}
else
{
app.get("/", (req, res) => {
  res.send("successfull");
});
}










app.use(notFound);

app.use(errorHandler);
const PORT=process.env.PORT||2500;
app.listen(PORT, console.log(`Server started at port ${PORT}`));