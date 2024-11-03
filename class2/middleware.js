const express=require("express");
const app=express();
const port=3001;

const loggerMiddleware=(req,res,next)=>{
    console.log("Inside Logger Middleware");
    next();
}
const auth=(req,res,next)=>{
    const params=req.query
    if(params.password==="123"){
        next();
    }else{
        res.status(401).json({message:"please pass right password"});
    }
};
app.use(loggerMiddleware);
//app.use(auth);
app.use(express.static("public"));
app.get("/",auth,(req,res)=>{
    res.send("Middleware App");
    
})

app.listen(port,(req,res)=>{
    console.log("Server is running on port ",port);
})