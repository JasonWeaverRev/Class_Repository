const { 
    addItem,
    setItemStatus
 } = require('../shoppingListFunctions');
 const path = require('path');
 const fs = require('fs');





// TESTING
// ********************************************************

const filePath = path.join(__dirname, "../data.json");
// Tests
describe('Shopping List Functionality Tests', () => {
    // Add an item an empty shopping list for every test
    beforeEach( () => {
        // fs.writeFileSync(filePath, JSON.stringify([]));
        addItem('Bread', 4, 1.99);
    })

    // Test adding an item with the addItem function
    test('should add an item to the shopping list', () => {
        const response = addItem('Salad', 3, 2.99);
        expect(response).toBe('Salad has been added to the shopping list');
    });

  // Test adjusting purchase status of an item with the setItemStatus function
    test('should set the purchase status of an item to true', () => {
        const response = setItemStatus(0);
        expect(response).toBe('Bread purchased status has been set to: true');
    });
});