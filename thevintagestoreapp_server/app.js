const express = require("express");
const app = express();
app.use(express.json());

//cors policy for server
var cors = require("cors");
app.use(cors());

//middeleware to log httprequest and errors
const morgan = require('morgan');
app.use(morgan('tiny'))

//middelware for put and delete request
const methodoverride= require('method-override')
app.use(methodoverride('_method'))
app.use(express.urlencoded({extended:true}))

//routes
const tradeRouter= require("./routes/tradeRoutes")
app.use("/trade",tradeRouter);

//middleware to handle pagenotfound error
app.use((req,res,next)=>{
    let err= new Error("Serevr cannot locate the given URL "+req.url)
    err.status=404;
    next(err)
 })
 
 //middleware to handle 500 internal server error
 app.use((err,req,res,next)=>{
     console.log(err.stack)
     if(!err.status){
         err.status=500;
         err.message="Internal server error.";
     }
     res.status(err.status)
     res.send({message:err.message,statusCode:err.status})
 })
//Starting server
const port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log("server running on port: ", port);
});