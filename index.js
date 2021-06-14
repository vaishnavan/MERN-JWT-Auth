const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3600 || process.env.PORT;
const mongoURI = "mongodb+srv://webshineauth:Vaish@123@cluster0.globp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//middleware
app.use(express.json());


app.use('/api/user', require('./controller/userRoute'))

app.get('/', (req, res) => {
    res.json({message:"Authentication API creation"})
})

app.listen((port), () => {
    console.log(`server up and running on port ${port}`)
})

mongoose.connect((mongoURI), {useNewUrlParser: true, useUnifiedTopology:true}, (err) => {
    if(!err){
        console.log("Database connected successfully");
    }else{
        console.log(err);
    }
})