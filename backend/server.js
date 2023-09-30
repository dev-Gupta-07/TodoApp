const express=require("express")
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const todoRoute=require("./routes/todoRoute")
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app=express();
app.use(express.json())
dotenv.config()
connectDB()
app.get("/",(req,res)=>{
    res.send("successfull")
})

app.use("/api/user", userRoute);
app.use("/api/do", todoRoute);
app.use(notFound);

app.use(errorHandler);
const PORT=process.env.PORT||2500;
app.listen(PORT, console.log(`Server started at port ${PORT}`));