const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: String,

    image: {
        type: {
            filename: String,
            url: String,
        },
        default: {
            filename: "listingimage",
            url: "https://images.unsplash.com/photo-1488462237306-f2a9148b55f0"
        }
    },

    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;