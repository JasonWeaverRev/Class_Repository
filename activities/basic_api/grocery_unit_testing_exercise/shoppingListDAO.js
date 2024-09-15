const fs = require('fs');
const path = require('path');
const {logger} = require('./util/logger.js');

// Path to the data file
const filePath = path.join(__dirname, "data.json");


//CRUD

// Create
// Rewrite the JSON file to include the updated shopping list
function writeShoppingList(shoppingList) {
    // Write a JSON shopping list, no replacers, add 2 spaces
    fs.writeFileSync(filePath, JSON.stringify(shoppingList, null, 2));
    
    // Log info
    logger.info("Shopping List updated in data.json");
}

// Read
// Create an empty array json file if the data file doesn't exist
// Then, read the data and return that data
function readShoppingList() {
    // if (!fs.existsSync(filePath)) {
    //     // If file does not exist, create an empty shopping list
    //     fs.writeFileSync(filePath, JSON.stringify([]));
    // }


    fs.writeFileSync(filePath, JSON.stringify([]));
    
    // Read data from the file path (in this case, dirname/"data.json")
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}


// The following functions can be replicated in this project by manipulating a shopping list object
// Update

// Delete

module.exports = {
    writeShoppingList,
    readShoppingList
}