const express=require("express");
const app=express();
const port=3000;

app.get("/",(req,res)=>{
    
    res.send("Hello World");
})
app.use(express.json());
let userInfo=[
{
    name:"Manas",
    email:"manaskaja@gmail.com"
}
];
app.get("/userDetailsInfo",(req,res)=>{
    res.status(200).json(userInfo);
})
app.post("/addNewUser",(req,res)=>{
    const newUser=req.body;
    if(!newUser?.name || !newUser?.email)
    {
        return res.status(400).json({message:"username and email are required"});
    }
    const existingUser=userInfo.find((user)=>user?.name.toLowerCase()===newUser?.name.toLowerCase());
    if(existingUser){
        return res.status(409).json({message:"user already exists"});
    }
    userInfo.push(newUser);
    res.status(201).json({message:"User created"});
});
//patch is used to modify
//put is used to replace
app.patch("/updateUserInfo",(req,res)=>{
    const {name,email}=req.body;
    if(!name || !email)
    {
        return res.status(400).json({message:"username and email are required"})
    }
    const userIndex=userInfo.findIndex((user)=>user?.name.toLowerCase()===name?.toLowerCase());
    if(userIndex===-1)
    {
        return res.status(404).json({message:"user not found"});
    }
    userInfo[userIndex].email=email;
    return res.status(200).json({message:"user info has been updated"});
})

app.delete("/deleteUSerInfo",(req,res)=>{
    const {name,email}=req.body;
    if(!name || !email){
        return res.status(400).json({message:"username and email are required"});
    }
    const initialLength=userInfo.length;
    userInfo=userInfo.filter((user)=>user?.name.toLowerCase()!==name?.toLowerCase());
    if(userInfo.length===initialLength)
    {
        res.status(404).json({message:"user not found"});
    }
    return res.status(200).json({message:"user has been deleted"});
});
app.listen(port,()=>{
    console.log("Server is running on port ",port);
})