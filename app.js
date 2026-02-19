const methodOverride = require("method-override");
const express = require("express");
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));  
const path = require("path");

const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("./models/listing.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


main().then(()=>{
    console.log("DB Connected");
}).catch((err)=>{
    console.log(err);
});

app.listen(8081,()=>{
    console.log("Sever is up at port 8081")
});

app.get("/", (req,res)=>{
    res.send("Hi iam root of AirBNB");
});

async function main() { 
    await mongoose.connect(MONGO_URL);
}

// app.get("/testListing", async (req,res)=>{
//     let sampleListiing = new Listing({
//         title: "My New Villa",   
//         description: "By the Beach",
//         image:"https://www.freepik.com/free-psd/three-dimensional-illustration-hotel-scene-with-booking-five-stars_38707639.htm#fromView=keyword&page=1&position=3&uuid=7e0d617d-e778-4432-a02a-aa6ea0036428&query=Hotel",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India"
//     });

//     await sampleListiing.save();
//     console.log("Sample was Saved");
//     res.send("succesful testing");
// });

//returning all listings

app.get("/listings",async (req,res)=>{

  const allListings = await Listing.find({});
  console.log(allListings);

 
    //res.render("listings/index",allListings);
    res.render("listings/index",{allListings});
});
  
app.get("/listings/new",(req,res) => {
    res.render("listings/new");
});

app.get("/listings/:id",async(req,res)=>{
    let{id} = req.params;
    const listing = await Listing.findById(id);
    
    res.render("listings/show",{listing});
});


// app.post("/listings", async (req,res)=>{
//     const newListing = new Listing(req.body);
//     await newListing.save();
//     res.redirect("/listings");
// });



app.post("/listings", async (req,res)=>{
     //let {title,description,image,price,country,location} = req.params;

    const newListing = new Listing(req.body.listing);
    await newListing.save();
    console.log(newListing);
    res.redirect("/listings");
});

app.get("/listings/:id/edit",async(req, res)=>{
    let{id} = req.params;
    const listing = await Listing.findById(id);
    
    res.render("listings/edit",{listing});
});

app.put("/listings/:id", async (req, res) => {

    const { id } = req.params;

    const updatedListing = await Listing.findByIdAndUpdate(
        id,
        req.body.listing,
        { new: true, runValidators: true }
    );

    res.redirect("/listings");
});

app.delete("/listings/:id", async (req,res)=>{
    await Listing.findByIdAndDelete(req.params.id);
    res.redirect("/listings");
});