const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

//MIDDLEWARE
app.use(express.json());

const blog = require("./routes/blog");

//  mmount
app.use("/api/v1", blog);

const connectWithDb = require("./config/database");
connectWithDb();

// start th server
app.listen(PORT, () =>{
    console.log(`App is started successfully at port no. ${PORT}`);
})

app.get("/",(req,res) => {
    res.send(`<h1>This is homepage sheth</h1>`);

} )