const express = require("express");
const app = express();
const mongoose =  require('mongoose');
const cors = require("cors");
const morgan = require('morgan');
const methodoverride= require('method-override')
const tradeRouter= require("./routes/tradeRoutes")

app.use(express.json());

//cors policy for server
app.use(cors());
app.use(express.static('public'));
//mongoose connection
mongoose.connect('mongodb://localhost:27017/VintageStore',{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
//start the server
//Starting server
const port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log("server running on port: ", port);
});
})
.catch(err=>console.log(err.message))

//middeleware to log httprequest and errors
app.use(morgan('tiny'))

//middelware for put and delete request
app.use(methodoverride('_method'))
app.use(express.urlencoded({extended:true}))

//routes
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

