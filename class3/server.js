const express=require("express");
const mongoose=require("mongoose");
const app=express();
const port=3000;
//use next in async callback
//use throw new error synchronous use case
app.use(express.json());
mongoose.connect("mongodb+srv://manaskaja:wvCsHSGhzFF4BJjw@cluster0.707cy.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0",
    {useNewUrlParser:true,useUnifiedTopology:true}
).then(()=>console.log("Database is connected successfully"))
.catch((err)=>console.log("database connection error ",err));


const errorHandler=(err,req,res,next)=>{
    res.status(res.statusCode || 404).json(
        {
            message:err.message
        }
    );
};
const productSchema=mongoose.Schema({
    product_name:{type:String,required:true},
    product_price:{type:String,required:true},
    isInStock:{type:Boolean,required:true},
    category:{type:String,required:true},
    },
    {timestamps:true}
);
const productModel=mongoose.model("Product",productSchema);

app.post("/shopApi/addProduct",async(req,res,next)=>{
    try{
        const {product_name,product_price,isInStock,category}=req.body;
        const product=await productModel.create({
            product_name,product_price,isInStock,category
        });
        res.status(201).json({message:"Product added",product});
    }catch (error){
        next(error);
    }
});

app.get("/shopApi/getAllProducts",async (req,res,next)=>{
    try{
        const allProducts=await productModel.find();
        res.send(allProducts);
    }catch (error){
        next(error);
    }
})

app.patch("/shopApi/updateProduct/:id",async (req,res,next)=>{
    try{
        const Id=req.params.id;
        const product=await productModel.findByIdAndUpdate(Id,req.body);
        if(!product){
            res.status(404).json({message:"Product not available"})
        }
        const UpdatedProduct=await productModel.findByIdAndUpdate(Id,req.body);
        res.status(200).json({message:"product updated",UpdatedProduct});
    }catch (error){
        next(error);
    }
});

app.delete("/shopApi/deleteProduct/:id", async (req,res,next)=>{
    try{
        const Id=req.params.id;
        const product=await productModel.findByIdAndDelete(Id,req.body);
        if(!product){
            res.status(404).json({message:"Product not available"})
        }
        
        res.status(200).json({message:"product deleted"});
    }catch (error){
        next(error);
    }
});
app.use(errorHandler);
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to shop</h1>")
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}` );
});