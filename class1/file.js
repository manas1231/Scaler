const fs=require("fs");
fs.readFile("./sample.txt","utf8",(err,data)=>{
    if(err)
    {
        console.log(err);
    }
    console.log(data);
});
const content="Hello World";
fs.writeFile("./sample.txt",content,"utf8",(err)=>{
    if(err){
        console.log(err);
    }
});

fs.rename("./sample.txt","newfile.txt",(err)=>{
    if(err){console.log(err);}
    console.log("file renamed");
});

fs.unlink("newfile.txt",(err)=>{
    if(err){console.log(err);}
    console.log("File Deleted");
});