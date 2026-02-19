const mongoose = require("mongoose");
const Listing = require("../models/listing.js");


const { data } = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to DB");
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(data);
  console.log("Data Was Initialized");
};

main()
  .then(initDB)
  .catch(err => console.log(err));