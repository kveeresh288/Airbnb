const express = require("express");
const app = express();

const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("./models/listing.js");

main().then(()=>{
    console.log("DB Connected");
}).catch((err)=>{
    console.logh(err);
});

app.listen(8081,()=>{
    console.log("Sever is up at port 8081")
});

app.get("/", (req,res)=>{
    res.send("Hi iam root");
});

async function main() { 
    await mongoose.connect(MONGO_URL);
}

app.get("/testListing", async (req,res)=>{
    let sampleListiing = new Listing({
        title: "My New Villa",   
        description: "By the Beach",
        image:"https://www.freepik.com/free-psd/three-dimensional-illustration-hotel-scene-with-booking-five-stars_38707639.htm#fromView=keyword&page=1&position=3&uuid=7e0d617d-e778-4432-a02a-aa6ea0036428&query=Hotel",
        price: 1200,
        location: "Calangute, Goa",
        country: "India"
    });
    await sampleListiing.save();
    console.log("Sample was Saved");
    res.send("succesful testing");
});
