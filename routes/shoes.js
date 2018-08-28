"use strict";
//  These first two lines import the express module and create an Express application
const express = require("express");
const shoes = express.Router();

// this is an initial array of objects with properties.
const shoeList = [{
    brand: "Nike",
    size: 10,
    color: ["White", "Red", "Blue"],
    price: 100,
    id: 0
}, {
    brand: "Nike",
    size: 10,
    color: ["Orange", "Red"],
    price: 100,
    id: 1
}];
// this variable counts the list of the Shoelist array above. This variable is incremented below in the Post/Delete and Get Methods
let idCount = shoeList.length;

// PUT - params + body
// DELETE - params
// POST - body
// GET - params

// the below shows a route definition whenever there is a http GET requst with a path. This Get Path is in the Shoes.js file.
shoes.get("/shoes", (req, res) => {
    res.send(shoeList);
});

shoes.post("/shoes", (req, res) => {
    shoeList.push({
        // Handle POST / request here
        // Get body of request
        // req stands for request
        brand: req.body.brand,
        size: req.body.size,
        color: req.body.color,
        price: req.body.price,
        // Id is the unique identifier of the object. It won't be repeated.
        id: idCount++
    });
    // this sends the response to the shoeList array.
    res.send(shoeList);
});

// Put is in a way like post but it updates the object Post is saving a new object.
// /shoes/:id is used because it's target one ID on the object.
shoes.put("/shoes/:id", (req, res) => {
    let count = 0;
    // this for loop targets one object in the array.
    for (let shoe in shoeList) {
        //this if condtion says that if shoe id matches the targeted ID id - update the shoes with below info.
        if (shoe.id == req.params.id) {
            let updatedShoes = {
                brand: req.body.brand,
                size: req.body.size,
                color: req.body.color,
                price: req.body.price,
                id: Number(req.params.id)
            }
            // this target the object in the array and splices the old object with the updated one.
            shoeList.splice(count, 1, updatedShoes);
        }
        count++;
    }
    res.send(shoeList);
});

// this is to delete an object from the array. Target one ID.
shoes.delete("/shoes/:id", (req, res) => {
    // req.params = the param added to the url
    let count = 0;
    // for loop targets one item in array.
    for (let shoe of shoeList) {
        //this if condtion says that if shoe id matches the targeted ID id - Delete the id which is targeted.
        if (shoe.id == req.params.id) {
            shoeList.splice(count, 1);
        }
        count++;
    }
    res.send(shoeList);
});

// This module is required in Node JS Routes. It connects to the Shoes.js file.
module.exports = shoes;