const express = require('express');
const cors = require('cors');
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
// Enable CORS for all origins
app.use(cors());

app.use("/url", urlRoute);
app.get("/:shortId", urlRoute);
app.get("/:shortId/redirecturl", urlRoute);

app.listen(PORT, ()=> {
    console.log(`Server Started on Port ${PORT}`);
})