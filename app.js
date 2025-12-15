const express = require("express");
const app = express();

const mongoose = require("mongoose");

app.listen(8081,()=>{
    console.log("Sever is up at port 8081")
});

app.get("/", (req,res)=>{
    res.send("Hello Dev");
});