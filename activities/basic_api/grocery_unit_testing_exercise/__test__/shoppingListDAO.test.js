const {readShoppingList, writeShoppingList} = require('../shoppingListDAO');
const fs = require('fs');
const path = require('path');

// Mock the fs module
jest.mock('fs');



// TESTING
// ********************************************************

// Clears the mock file stream before each test
describe('DAO Tests', () => {
    beforeEach( () => {
        fs.writeFileSync.mockClear()
    });




    // Test: Writes data to the Data file
    test('should write shopping list to data.json', () => {
        const shoppingList = [{name: 'Milk', quantity: 4, price: 2.99}];

        // Call the function to write the shopping list
        writeShoppingList(shoppingList);

        // Generate the correct file path
        const filePath = path.join(__dirname, '../data.json');

        // Check if fs.writeFileSync was call with the correct arguments
        expect(fs.writeFileSync).toHaveBeenCalledWith(filePath, JSON.stringify(shoppingList, null, 2));
    });

}); 