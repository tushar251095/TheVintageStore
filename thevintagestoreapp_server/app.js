const express = require("express");
const app = express();
app.use(express.json());

//cors policy for server
var cors = require("cors");
app.use(cors());

//routes
const tradeRouter= require("./routes/tradeRoutes")
const mainRouter= require("./routes/mainRoutes")
app.use("/trade",tradeRouter);
app.use("/",mainRouter);

//Starting server
const port = process.env.PORT || 3000;
app.listen(port, () => {
 // console.log("server running on port: ", port);
});