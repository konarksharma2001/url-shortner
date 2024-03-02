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


app.use(express.json()); // middleware to parse incoming request into json format
app.use("/url", urlRoute);
app.get("/:shortId", urlRoute);

app.listen(PORT, ()=> {
    console.log(`Server Started on Port ${PORT}`);
})