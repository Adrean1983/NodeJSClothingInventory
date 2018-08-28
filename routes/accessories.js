"use strict"
const express = require("express");
const accessories = express.Router();

const accessoriesList = [{
    type: "Belt",
    size: "large",
    price: 30,
    id: 0

}];
let idCount = accessoriesList.length;

accessories.get("/accessories", (req, res) => {
    res.send(accessoriesList);
});

accessories.post("/accessories", (req, res) => {
    accessoriesList.push({
        type: req.body.type,
        size: req.body.size,
        price: req.body.price,
        id: idCount++
    });
    res.send(accessoriesList);
});
accessories.put("/accessories/:id", (req, res) => {
    let count = 0;
    for (let accessory of accessoriesList) {
        if (accessory.id == req.params.id) {
            let updatedAccessory = {
                type: req.body.type,
                size: req.body.size,
                price: req.body.price,
                id: Number(req.params.id)
            }    
            accessoriesList.splice(count, 1, updatedAccessory);
        }
        count++;
    }
    res.send(accessoriesList);
});

accessories.delete("/accessories/:id", (req, res) => {
    let count = 0;
    for (let accessory of accessoriesList) {
        if (accessory.id == req.params.id) {
            accessoriesList.splice(count, 1);
        }
        count++;
    }
    res.send(accessoriesList);

});
module.exports = accessories;