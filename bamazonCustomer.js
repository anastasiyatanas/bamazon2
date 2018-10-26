var mysql = require('mysql');
var inquirer = require('inquirer');
require ("console.table");

var PORT = process.env.PORT || 8080
//connecting MySQL
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
  });
  
 // Initiate MySQL Connection.
connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
    show();
  });

  //showing the products.
  function show() {
    connection.query ("SELECT * FROM products", function(err, res){
      if (err) throw err;
      console.table (res);
      promptUser(res)
    });
  }

  //user enters id of purchase
  function promptUser(inventory) {
    inquirer.prompt([
      {
        type: "input",
        name: "productId",
        message: "Please enter the Id of the product you would like to purchase"
      },
      {
        type: "input",
        name: "quantity",
        message: "Please enter the amount you would like to purchase."
      }
    ]). then(function(prompt){
      var product = checkInventory(prompt.productId, inventory)
      purchase(product, prompt.quantity)
    })
  }
 
  function purchase(product, quantity) {
    if (quantity > product.stock) {
      console.log("not enought in stock")
      show()
    } else {
    connection.query("update products set stock = stock - ? where id = ?", [
      quantity, product.id
    ], function(err, res) {
      console.log(err);
      console.log(res);
      console.log("You have successfully purchased the item!")
      show();
    });
  }
  }

  function checkInventory(id, inventory) {
    for (var i = 0; i < inventory.length; i++) {
      if (inventory[i].id == id) {
        return inventory[i]
      }
    }
    return null
  }
 
 
 
 







 
 
 
 
 
 
 
 
 
 
 
 
 
  
