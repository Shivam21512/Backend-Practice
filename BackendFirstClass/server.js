// server instantiate 
const express = require('express');
const app = express();

// Used to parse req,body in express -> PUT OR POST
const bodyParser = require('body-parser');

// Specifically parse JSON data & add it  to the request.Body object
app.use(bodyParser.json());

//Activate the sever on 3000 port
app.listen(5000, () => {
    console.log("server started at 5000 port")
});


// routes 
app.get('/', (request,response) => {
    response.send("Hello sheth");
})

app.post('/api/cars',(request,response) => {
    const{name, branch, model} = request.body;
    console.log(name);
    console.log(branch);
    console.log(model);
    response.send("Car Submitted Successfully")
})

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myDatabase', {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => {console.log("Connection Successful")})
.catch( (error) => {console.log("Recieved an error")});