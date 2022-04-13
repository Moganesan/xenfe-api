var mysql = require("mysql");

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "xenfe",
//   password: "xenfeadmin",
//   database: "check"
// });

var con = mysql.createConnection({
  host: "localhost",
  user: "zonxo_admin",
  password: "XARAadmin",
  database: "zonxo_xenfe",
});

con.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + con.threadId);

  // create admin information table

  var sql =
    "CREATE TABLE admin_information (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, company_name varchar(50), owner_name varchar(50), contact varchar(13), whats_app varchar(13), email varchar(255), address_1 varchar(255),address_2 varchar(255), city varchar(50), pincode int(10), state_id int(3), country_id int(3), gtin varchar(50), website varchar(255), facebook varchar(255), instagram varchar(255), youtube varchar(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("admin information Table created");
  });

  //create Category*

  var sql =
    "CREATE TABLE category (cat_id INT(10) AUTO_INCREMENT PRIMARY KEY, cat_name varchar(255) NOT NULL, cat_desc varchar(1000), UploadImageName varchar(255), OriginalImageName varchar(255), tags varchar(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Category Table created");
  });

  //   create customer

  var sql =
    "CREATE TABLE customer (customer_id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, salution varchar(20) DEFAULT NULL, first_name varchar(20)NOT NULL, second_name varchar(20) NOT NULL, comany varchar(100) NOT NULL, mobile varchar(10) NOT NULL, passwrd varchar(64) NOT NULL, role_id int(10) NOT NULL, disc_group_id int(10), created timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(), updated timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp())";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Customer Table created");
  });

  //   create customer address

  var sql =
    "CREATE TABLE customer_address (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, customer_id int(10) NOT NULL, branch varchar(20)NOT NULL, salution varchar(20) DEFAULT NULL, first_name varchar(20), second_name varchar(20),company_name varchar(20), gstin varchar(10) NOT NULL, address1 varchar(255)NOT NULL, address2 varchar(255)NOT NULL, city varchar(20)NOT NULL,pincode varchar(10) NOT NULL, state_id varchar(10) NOT NULL, country_id varchar(20) NOT NULL, landline varchar(20) NOT NULL, mobile varchar(13) NOT NULL, whatsapp varchar(13) NOT NULL, created timestamp NOT NULL DEFAULT current_timestamp(), updated timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp())";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Customer address Table created");
  });

  // create Products

  var sql =
    "CREATE TABLE products (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, sku int(10) NOT NULL, title varchar(255) DEFAULT NULL, image varchar(255) DEFAULT NULL, images text DEFAULT NULL, description text DEFAULT NULL, price float DEFAULT NULL, quantity int(10) DEFAULT NULL, tax_id int(3) DEFAULT NULL, short_desc varchar(255) DEFAULT NULL, cat_id int(10) DEFAULT NULL, tag_id int(10) DEFAULT NULL)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Products Table created");
  });

  // create Roles

  var sql =
    "CREATE TABLE roles (role_id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, title varchar(100) DEFAULT NULL)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Roles Table created");
  });

  //create Sub category

  var sql =
    "CREATE TABLE sub_category (`sub_category_id` int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, `sub_category_name` varchar(20) DEFAULT NULL, `cat_id` int(10) DEFAULT NULL)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("sub_category Table created");
  });

  //create Leads

  var sql =
    "CREATE TABLE leads (`id` int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, `customer` varchar(50), `mobile` int(15) DEFAULT NULL, `address1` varchar(255), `address2` varchar(255), `state` int(15), `requirement` varchar(255), `assign_to` int(10))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("leads Table created");
  });

  // create delivery_challan table

  var sql =
    "CREATE TABLE delivery_challan (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, customer_id int(10) NOT NULL, backorder_id int(10), shipping_id int(10), billing_id int(10), total_quantity int(10), total_price float, created timestamp NOT NULL DEFAULT current_timestamp(), updated timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp())";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("delivery_challan Table created");
  });

  // create delivery_challan detail table

  var sql =
    "CREATE TABLE delivery_challan_detail (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, delivery_challan_id int(10), product_id int(10), quantity int(10), cash_tax int(10), price float, price_after_discount float, line_total float)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("delivery_challan detail Table created");
  });

  // create tax table

  var sql =
    "CREATE TABLE tax (tax_rate_id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, tax_name varchar(100), tax_rate float)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("tax Table created");
  });

  // create tax rule table

  var sql =
    "CREATE TABLE tax_rule (tax_rule_id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, tax_rate_id int(3), tax_rule_name varchar(100), tax_rate float)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("tax rule Table created");
  });

  // create tax summary table

  var sql =
    "CREATE TABLE tax_summary (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, product_order_id int(3), tax_id int(3), subtotal float, cgst float, sgst float, igst float)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Tax Summary Table created");
  });

  // alter customer address table

  var sql =
    "ALTER TABLE customer_address ADD CONSTRAINT fk_cust_a_id FOREIGN KEY (customer_id) REFERENCES customer (customer_id) ON DELETE CASCADE ON UPDATE CASCADE";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("customer address Table Altered");
  });

  // create Quote Template

  var sql =
    "CREATE TABLE quotetemplate (template_id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, userId int(11) NOT NULL, templateName varchar(100) NOT NULL, templateDesc varchar(256) NOT NULL, total int(11) NOT NULL, created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, updated timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP )";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Quote Template Table created");
  });

  // create template Details

  var sql =
    "CREATE TABLE quotetemplate_details (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, template_id int(11) NOT NULL, product_id int(10) NOT NULL, quantity int(11) NOT NULL, price int(11) NOT NULL)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Quote template Details Table created");
  });

  //Add foreign key to quote Template

  var sql =
    "ALTER TABLE `quotetemplate` ADD CONSTRAINT `fk_user_id_template` FOREIGN KEY (`userId`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Quote Template Details Table Altered");
  });

  //Add foreign key to quote Template Details

  var sql =
    "ALTER TABLE `quotetemplate_details` ADD CONSTRAINT `fk_template_id` FOREIGN KEY (`template_id`) REFERENCES `quotetemplate` (`template_id`) ON DELETE CASCADE ON UPDATE CASCADE, ADD CONSTRAINT `fk_product_temp_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Quote Template Details Table Altered");
  });

  // create backorder table

  var sql =
    "CREATE TABLE backorder (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, customer_id int(10) NOT NULL, shipping_id int(10), billing_id int(10), total float, total_quantity int(255), balance_quantity int(255), shipped tinyint, created timestamp NOT NULL DEFAULT current_timestamp(), updated timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp())";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("backorder Table created");
  });

  // create backorder detail table

  var sql =
    "CREATE TABLE backorder_detail (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, backorder_id int(10), product_id int(10), quantity int(10), shipped_quantity int(255), balance_quantity int(255), price float, tax_id int(3), tax_rate int(3), price_after_tax float, discount varchar(10), line_discount_price float, tax float, line_total float, invoive_id int(10))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("backorder detail Table created");
  });

  // create quotation table

  var sql =
    "CREATE TABLE quotation (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, customer_id int(10) NOT NULL, shipping_id int(10), billing_id int(10),sub_total float, total_tax float, total float, created timestamp NOT NULL DEFAULT current_timestamp(), updated timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp())";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Quotation Table created");
  });

  // create quotation detail table

  var sql =
    "CREATE TABLE quotation_detail (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, quotation_id int(10), product_id int(10), quantity int(10), price float, tax_id int(3), tax_rate int(3), price_after_tax float, discount varchar(10), line_discount_price float, line_discount_price_et float, tax float, line_total float)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Quotation detail Table created");
  });

  // alter quotation table

  var sql =
    "ALTER TABLE quotation ADD CONSTRAINT fk_cust_q_id FOREIGN KEY (customer_id) REFERENCES customer (customer_id) ON DELETE CASCADE ON UPDATE CASCADE, ADD CONSTRAINT fk_cust_q_sid FOREIGN KEY (shipping_id) REFERENCES customer_address (id) ON DELETE CASCADE ON UPDATE CASCADE, ADD CONSTRAINT fk_cust_q_bid FOREIGN KEY (billing_id) REFERENCES customer_address (id) ON DELETE CASCADE ON UPDATE CASCADE";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Quotation Table Altered");
  });

  // alter quotation detail table

  var sql =
    "ALTER TABLE quotation_detail ADD CONSTRAINT fk_cust_qd_id FOREIGN KEY (quotation_id) REFERENCES quotation (id) ON DELETE CASCADE ON UPDATE CASCADE, ADD CONSTRAINT fk_cust_p_id FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE ON UPDATE CASCADE";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Quotation_detail Table Altered");
  });

  // create Discount Group Table

  var sql =
    "CREATE TABLE discount_group (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, discount_name varchar(50), discount_value int(10))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Discount group Table created");
  });

  // create cash_invoice table

  var sql =
    "CREATE TABLE cash_invoice (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, order_id int(10) NOT NULL, customer_id int(10) NOT NULL, shipping_id int(10), billing_id int(10) , round_total int(10), total float, sub_total float, total_cgst float,total_sgst float,total_igst float, created timestamp NOT NULL DEFAULT current_timestamp(), updated timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp())";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("cash_invoice Table created");
  });

  // create cash_invoice detail table

  var sql =
    "CREATE TABLE cash_invoice_detail (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, quotation_id int(10), product_id int(10), quantity int(10), price float, tax_id int(3), tax_rate int(3), price_after_tax float, discount int(10), line_discount_price float, igst float, cgst float, sgst float, line_total float)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("cash_invoice detail Table created");
  });

  // create tax_invoice table

  var sql =
    "CREATE TABLE tax_invoice (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, order_id int(10) NOT NULL, customer_id int(10) NOT NULL, shipping_id int(10), billing_id int(10) , round_total int(10), total float, sub_total float, total_cgst float,total_sgst float,total_igst float, created timestamp NOT NULL DEFAULT current_timestamp(), updated timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp())";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("tax_invoice Table created");
  });

  // create tax_invoice detail table

  var sql =
    "CREATE TABLE tax_invoice_detail (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, tax_invoice_id int(10), product_id int(10), quantity int(10), price float, tax_id int(3), tax_rate int(3), price_after_tax float, discount varchar(10), line_discount_price float, igst float, cgst float, sgst float, line_total float)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("tax_invoice detail Table created");
  });

  // create product_order table

  var sql =
    "CREATE TABLE product_order (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, customer_id int(10) NOT NULL, shipping_id int(10), billing_id int(10) , round_total int(10), total float, total_wo_tax float, discount varchar(10), sub_total float, total_cgst float,total_sgst float,total_igst float, total_quantity int(10), created timestamp NOT NULL DEFAULT current_timestamp(), updated timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp())";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("product_order Table created");
  });

  // create order detail table

  var sql =
    "CREATE TABLE order_detail (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, product_order_id int(11), product_id int(10), quantity int(10), price float, tax_id int(3), tax_rate int(3), price_after_tax float, discount int(10), line_discount_price float, line_discount_price_wo_tax float, igst float, cgst float, sgst float, line_total float)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("order detail Table created");
  });

  console.log("Successfully created DB");
});
