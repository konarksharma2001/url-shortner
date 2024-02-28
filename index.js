const express = require('express');
const { connectToMongoDB } = require('./connection');
const URL = require("./models/url");
const urlRoute = require("./routes/url");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=> {
    console.log("Mongo DB Connected");
})


app.use(express.json()); // middleware
app.use("/url", urlRoute);

app.listen(PORT, ()=> {
    console.log(`Server Started on Port ${PORT}`);
})