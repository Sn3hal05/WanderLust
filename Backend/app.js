const express = require('express');
const app = express();
const path = require("path");
const mongoose = require('mongoose');

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const Listing = require('./models/listing.js')
app.use(express.urlencoded({extended:true}));

async function main(){
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => {
        console.log("Database connected");
        app.listen(7709, () => {
            console.log("Server is listening to port 7709");
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));



// app.get("/testListing", async (req,res)=>{
//     let sampleListing =new Listing({
//         title:"My new Villa",
//         description:"By the beach",
//         price:1200,
//         location:"Calangute, Goa",
//         country:"India",
//     });
//     await sampleListing.save();
//     console.log("Sample data was Saved");
//     res.send("succesfully testing")

// });

app.get("/listings/:id",async (req,res)=>{
    let { id }=req.params;
    const listing= await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})



app.get("/listings", async (req,res)=>{
    const allListings = await Listing.find({});
;
    res.render("listings/index.ejs",{allListings});


})

app.get('/', (req, res) => {
    res.send("very first API");
});