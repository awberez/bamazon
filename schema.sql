DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products
(
item_id int NOT NULL AUTO_INCREMENT,
product_name varchar(255) NOT NULL,
department_name varchar(255) NOT NULL,
price INT(4) NOT NULL,
stock_quantity INT(4) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Velociraptor", "Pets", 25, 100),("Pterosaur", "Pets", 35, 70),("Leather Couch", "Home", 100, 30),("Gazebo", "Home", 500, 10),("Old-Timey Weathervane", "Home", 15, 50),("The Orb of All Knowledge", "Arcane Relics", 8000, 10),("Computer", "Electronics", 500, 150),("Headphones", "Electronics", 25, 250),("Printer", "Electronics", 45, 100),("Charging Cable", "Electronics", 5, 80);
