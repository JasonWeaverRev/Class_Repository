const {
    readShoppingList,
    writeShoppingList
} = require("./shoppingListDAO.js");
const {logger} = require("./util/logger.js");

// Initially load the shopping list from the file
// Should initally return an empty array
// SEE: shoppingListDAO.js for the readShoppingList() function details
let shoppingList = readShoppingList();


// Add item in the grocery shopping list for POST request
function addItem(name, quantity, price) {
    const newItem = {
        name,
        quantity,
        price: parseFloat(price).toFixed(2), // Convert price to a float with 2 decimal places
        purchased: false
    }

    // Add the item to the shopping list
    shoppingList.push(newItem);

    // Persist the shopping list to the data file
    writeShoppingList(shoppingList);
    logger.info(`Added item: ${name}`);
    return `${name} has been added to the shopping list`;
}

// Set purchase status for a grocery item for PUT request
function setItemStatus(ind) {
    // Reverse the purchasing status of the specficied item at an index
    shoppingList[ind].purchased = !shoppingList[ind].purchased;

    // Persist the shopping list to the data file
    writeShoppingList(shoppingList);
    logger.info(`Set purchasing status of item: ${shoppingList[ind].name}`);
    return `${shoppingList[ind].name} purchased status has been set to: ${shoppingList[ind].purchased}`;
}

// Remove an item from the grocery shopping list for DELETE request
function deleteItem(ind) {
    // Reverse the purchasing status of the specficied item at an index
    const removedItem = shoppingList.splice(ind, 1); //Splice at index, remove 1 item

    // Persist the shopping list to the data file
    writeShoppingList(shoppingList);
    logger.info(`Removed item: ${removedItem[0].name}`);
    return `Removed ${removedItem[0].name} from the shopping list`;
}


module.exports = {
    shoppingList,
    addItem,
    setItemStatus,
    deleteItem
}