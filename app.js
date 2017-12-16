const inquirer = require("inquirer"), mysql = require("mysql"), colors = require("colors"),
connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "sqlWorld1",
  database: "bamazon_db"
});

let productArr;

connection.connect((err)=>{
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  readProducts();
});

function readProducts() {
  productArr = [];
  console.log("Available Products\n");
  connection.query("SELECT * FROM products ORDER BY product_name ASC", (err, res)=>{
    if (err) throw err;
    for (let product of res) {
      productArr.push( {name: product.product_name, value: product.item_id});
      console.log(`Product: ${product.product_name}\nDepartment: ${product.department_name}\nPrice: $${product.price}\nQuantity: ${product.stock_quantity}\nID: ${product.item_id}\n`);
    }
    customerPrompt();
  });
}

function validCheck(input) { return !isNaN(parseInt(input)) || "Invalid response"; }

function customerPrompt() {
  inquirer
    .prompt([ 
      { type: "list", message: "What would you like to buy?", choices: productArr, name: "what", validate: validCheck },
      { type: "input", message: "What quanity would you like?", name: "amount", validate: validCheck } 
    ])
    .then((response)=>{
      connection.query("SELECT * FROM products WHERE item_id = ?", [response.what], (err, res)=>{
        if (err) throw err;
        if (response.amount <= res[0].stock_quantity) {
          let totalPrice = response.amount * res[0].price, newQuantity = res[0].stock_quantity - response.amount;
          connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: newQuantity }, { item_id: response.what }], (err, resp)=>{
            if (err) throw err;
            console.log(`\n${'Customer Invoice'.underline}\n${res[0].product_name} (${response.amount})\n${'Total'.bold} = $${totalPrice}\n`);
            buyMore();
          });
        }
        else {
          console.log(`\nInsufficient quanity!\n`);
          buyMore();
        }
      });
    });
}

function buyMore() {
  inquirer
    .prompt([{ type: "confirm", message: "Would you like to make another purchase?", name: "more" }])
    .then((response)=>{ response.more ? readProducts() : connection.end(); });
}