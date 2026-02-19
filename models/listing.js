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
      filename: {
        type: String,
        default: "listingimage"
      },
      url: {
        type: String,
        required: [true, "Image URL is required"]
      }
    },
  
    price: { 
      type: Number,
      required: [true, "Price is required"],
      min: 0
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


