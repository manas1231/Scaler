const express=require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const port=3000;
const app=express();
const productRoutes=require("./routes/ProductRoutes")
app.use(express.json());
//Connect to Database
connectDB();

app.get("/",(req,res)=>{
    res.send("<h1>Welcome to shop</h1>")
})

app.use("/shopApi",productRoutes);

app.use(errorHandler);

app.listen(port,()=>{
    console.log("Server is runnning on port ",port);
})