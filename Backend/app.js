const express = require('express');
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const Listing = require('./models/listing.js')
app.use(express.urlencoded({extended:true}));

app.use(methodOverride('_method'));

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

app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
})

app.get("/listings/:id/edit", async(req,res)=>{
    let {id}=req.params;
    const listing = await  Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
})

app.put("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
    
})

app.delete("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})

app.get("/listings/:id",async (req,res)=>{
    let { id }=req.params;
    const listing= await Listing.findById(id);
    res.render("listings/show.ejs",{listing});

})

app.post("/listings", async(req,res)=>{
    // let {title, description, image, price, location, country} = req.body;
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})







app.get("/listings", async (req,res)=>{
    const allListings = await Listing.find({});
;
    res.render("listings/index.ejs",{allListings});


})

app.get('/', (req, res) => {
    res.send("very first API");
});