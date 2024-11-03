const http=require("http");

const server=http.createServer((req,res)=>{
    //request headers are set here

    res.setHeader("Content-type","html"); 
    //response message in terms of html
    res.write("<h1>Hello World</h1>");
    res.statusCode=200;
    res.end();
})
const port=3000;
const host="localhost";
server.listen(port,host,()=>{
    console.log("server is listening on this port : ",port);
});