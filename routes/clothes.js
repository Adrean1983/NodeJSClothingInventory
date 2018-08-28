"use strict";
//  These first two lines import the express module and create an Express application
const express = require("express");
const clothes = express.Router();


// this is an initial array of objects with properties.
const clothingList = [{
    type: "spring",
    size: 10,
    color: ["White", "Red", "Blue"],
    gender: "Male",
    id: 0
}, {
    brand: "Summer",
    size: 12,
    color: ["Orange", "Red"],
    gender: "Female",
    id: 1
}];
// this variable counts the list of the clothinglist array above. This variable is incremented below in the Post/Delete and Get Methods
let idCount = clothingList.length;

// the below shows a route definition whenever there is a http GET requst with a path. This Get Path is in the clothes.js file.
clothes.get("/clothes", (req, res) => {
    res.send(clothingList);
});

clothes.post("/clothes", (req, res) => {
    clothingList.push({
        // Handle POST / request here
        // Get body of request
        // req stands for request
        type: req.body.type,
        size: req.body.size,
        color: req.body.color,
        gender: req.body.gender,
        // Id is the unique identifier of the object. It won't be repeated.
        id: idCount++
    });
    // this sends the response to the clothingList array.
    res.send(clothingList);
});

// Put is in a way like post but it updates the object Post is saving a new object.
// /clothes/:id is used because it's target one ID on the object.
clothes.put("/clothes/:id", (req, res) => {
    let count = 0;
    // this for loop targets one object in the array.
    // console.log(req.params.id);
    // console.log(req.body);
    for (let clothes of clothingList) {
        //this if condtion says that if shoe id matches the targeted ID id - update the shoes with below info.
        if (clothes.id == req.params.id) {
            let updatedClothing = {
                type: req.body.type,
                size: req.body.size,
                color: req.body.color,
                gender: req.body.gender,
                id: Number(req.params.id)
            }
            // this target the object in the array and splices the old object with the updated one.
            clothingList.splice(count, 1, updatedClothing);
        }
        count++;
    }
    res.send(clothingList);
});

// this is to delete an object from the array. Target one ID.
clothes.delete("/clothes/:id", (req, res) => {
    // req.params = the param added to the url
    let count = 0;
    // for loop targets one item in array.
    for (let clothing of clothingList) {
        //this if condtion says that if shoe id matches the targeted ID id - Delete the id which is targeted.
        if (clothing.id == req.params.id) {
            clothingList.splice(count, 1);
        }
        count++;
    }
    res.send(clothingList);
});
// This module is required in Node JS Routes. It connects to the Shoes.js file.
module.exports = clothes;