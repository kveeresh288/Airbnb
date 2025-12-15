const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: { 
        type: String, 
        required: [true, "Title is required"] 
    },
    description: { 
        type: String, 
        required: [true, "Description is required"] 
    },
    image: { 
        type: String,
        required: [true, "Image URL is required"]
        // set: (v) => v==="" ? "defaultLink": v ,
    }, // we can also add default image if image is not avaiable using Ternary Operator 
    price: { 
        type: Number,
        required: [true, "Price is required"] 
    },
    location: { 
        type: String, 
        required: [true, "Location is required"] 
    },
    country: { 
        type: String, 
        required: [true, "Country is required"] 
    }
});

const  Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;


