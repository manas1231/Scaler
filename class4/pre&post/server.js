const express=require("express");
const mongoose=require("mongoose");
const app=express();
const port=3000;
app.use(express.json())

mongoose.connect("mongodb+srv://manaskaja:wvCsHSGhzFF4BJjw@cluster0.707cy.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0",
    {useNewUrlParser:true,useUnifiedTopology:true}
).then(()=>console.log("Database is connected successfully"))
.catch((err)=>console.log("database connection error ",err));

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
    },
    {timestamps:true}
);
const User=mongoose.model("user",userSchema);

app.post("/users",async (req,res)=>{
    try{
        const newUser=new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        });
        await newUser.save();
        res.status(201).send("User has been created successfully")
    }catch(err){
        next(err);
    }
});

app.delete("/users/:id",async (req,res)=>{
    try{
        const Id=req.params.id;
        const product=await User.findByIdAndDelete(Id,req.body);
        if(!product){
            res.status(404).json({message:"Product not available"})
        }
        
        res.status(200).json({message:"product deleted"});
    }catch (error){
        next(error);
    }
});
app.listen(port,()=>{
    console.log("Server is running on port ",port);
})