"use strict";

//using express and the modules.
const express = require("express");
const app = express();
const shoes = require("./routes/shoes");
const clothes = require("./routes/clothes")
const accessories = require("./routes/accessories")

// this defines the path for our server.
app.use(express.static("./public"));
app.use(express.json());
app.use("/api/shop", shoes);
app.use("/api/shop", clothes);
app.use("/api/shop", accessories);

// this is the port number using for the server
const port = 5000;

// this function listens for the port number.
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});