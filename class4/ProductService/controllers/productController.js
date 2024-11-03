const productModel=require("../models/Product");

const getAllProducts= async (req,res,next)=>{
    try{
        const allProducts=await productModel.find();
        res.send(allProducts);
    }catch (error){
        next(error);
    }
};

const addProduct= async (req,res,next)=>{
    try{
        const {product_name,product_price,isInStock,category}=req.body;
        const product=await productModel.create({
            product_name,product_price,isInStock,category
        });
        res.status(201).json({message:"Product added",product});
    }catch (error){
        next(error);
    }
};

const updateProduct= async (req,res,next)=>{
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
};

const deleteProduct=async (req,res,next)=>{
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
};

const getProductById=async (req,res,next)=>{
    try{
        const Id=req.params.id;
        const product=await productModel.findById(Id);
        if(!product){
            return res.status(404).json({message:"Product Not Found"});

        }
        res.status(200).json(product);
    }catch(error){
        next(error);
    }
};

module.exports={
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById
}