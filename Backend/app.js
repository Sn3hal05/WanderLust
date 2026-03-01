const express = require('express');
const app = express();

const mongoose = require('mongoose');

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

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

app.get('/', (req, res) => {
    res.send("very first API");
});