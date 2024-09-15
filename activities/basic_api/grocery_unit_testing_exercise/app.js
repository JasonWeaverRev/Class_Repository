// Import necessary modules
const fs = require("fs");
const http = require("http");
const {logger} = require('./util/logger.js');
const { 
    shoppingList,
    addItem,
    setItemStatus,
    deleteItem } = require("./shoppingListFunctions");


// Server Port 
const PORT = 3000;

// Data File
// Set up Grocery Data File
fs.writeFileSync('data.json', JSON.stringify([]));

// Server Setup and Functions
const server = http.createServer((req, res) => {

    // Acknoledge Request 
    logger.info(`[${req.method} ${req.url}]`); // Logs HTTP request method and URL

    // Set Up Response Header
    res.setHeader('Content-Type', 'application/json');

    // Handle HTTP methods
    let reqBody = '';

    // Read the request
    req
        .on('data', (chunk) => {
            reqBody += chunk;
        })
        .on('end', () => {
            // If the request body is not empty, get the body as a JavaScript object.
            // Otherwise, treat it as empty.
            reqBody = reqBody.length > 0 ? JSON.parse(reqBody) : {};

            // Assume ALL content we get as a body is a JSON type
            const contentType = {"Content-Type" : "application/json"};

            // Retrieve URL. Primary URL searches through /items
            if(req.url.startsWith("/items")) {
                // Get index from the URL ([2] = grabs number after 2nd '/')
                let index = parseInt(req.url.split("/")[2]);

                // Handle request methods
                switch(req.method) {

                    // GET /items
                    // Retrieve all items
                    case "GET":

                        res.writeHead(200, contentType);
                        res.end (
                            JSON.stringify({
                                shoppingList
                            })
                        );
                        break;
            
                    // POST /items 
                    // Add an item to the grocery list
                    case "POST":

                        const {name, quantity, price} = reqBody; //extract name and price from the body
                        console.log(`${name} | ${quantity} | ${price}`);
                        // If NOT valid grocery item
                        if(!name || !price || !quantity) {
                            res.writeHead(400, contentType);
                            res.end (
                                JSON.stringify({
                                    message: "Please provide valid name and price"
                                })
                            );

                        } 
                        // If VALID grocery item 
                        else {
                            const message = addItem(name, quantity, price);
                            res.writeHead(201, contentType);
                            res.end (
                                JSON.stringify({message, shoppingList})
                            );
                        }
            
                        break;
            
                    // PUT /items/:index  
                    // Set purchase status at :index
                    case "PUT":

                        // Check if the index is valid
                        // Not valid case
                        if (index <= 0 || index > reqBody.length ) {
                            res.writeHead(400, contentType);
                            res.end (
                                JSON.stringify({
                                    message: "Please enter a valid item index"
                                })
                            );
                        }
                        // Valid index case
                        else {
                            const message = setItemStatus(index - 1);
                            res.writeHead(200, contentType);
                            res.end (
                                JSON.stringify({message, shoppingList})
                            );
                        }
                        break;
                    
                    // DELETE /items/:index
                    case "DELETE":

                        // Check if the index is valid
                        // Not valid case
                        if (index <= 0 || index > reqBody.length ) {
                            res.writeHead(400, contentType);
                            res.end (
                                JSON.stringify({
                                    message: "Please enter a valid item index"
                                })
                            );
                        }
                        // Valid index case
                        else {
                            const message = deleteItem(index - 1);
                            res.writeHead(200, contentType);
                            res.end (
                                JSON.stringify({message, shoppingList})
                            );
                        }

                        break;
            
                    default:
                        res.writeHead(405, contentType);
                        res.end(JSON.stringify({message: "Invalid Method"}));
                        break;
            
                }
            } 
            
            // If request is NOT sent to /items // Faulty URL 
            else {
                res.writeHead(404, contentType);
                res.end(JSON.stringify({message: "Invalid Endpoint"}));
            }
        });

    


});

// Listen to the HTTP port initiaztion
server.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`)
});
