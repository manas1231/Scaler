const mongoose=require("mongoose");
const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb+srv://manaskaja:wvCsHSGhzFF4BJjw@cluster0.707cy.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0",
            {useNewUrlParser:true,useUnifiedTopology:true}
        );
        console.log("MongoDb connected")
    }catch(error){
        console.log("MongoDB connection error ",error);
        process.exit(1);
    }
}

module.exports=connectDB;