var mysql = require("mysql");

// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "xenfe",
//   password: "xenfeadmin",
//   database: "xenfe_test"

// });

var con = mysql.createConnection({
  host: "localhost",
  user: "zonxo_admin",
  password: "XARAadmin",
  database: "zonxo_xenfe",
});

// con.connect(function(err) {
//     if (err) throw err;
//     console.log(" SQL DB Connected!");
// });

// var con = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'Xenfe',
//   password : 'Xenfe@123',
//   database: 'test1'
// });

// var con = mysql.createConnection({
//   user: 'root',
//   //password: 'Mysql@123',
//   socketPath: 'mysql-socket-path', /*example: /Applications/MAMP/tmp/mysql/mysql.sock*/
//   database: 'test1'
// });

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

  // create Course

  var sql =
    "CREATE TABLE course (course_id INT(10) AUTO_INCREMENT PRIMARY KEY, title varchar(50) NOT NULL, small_desc varchar(500), `cat_id` int(10) DEFAULT NULL, tag_id INT(10) NOT NULL, cur_id INT NOT NULL, fee float NOT NULL, UploadImageName varchar(255), OriginalImageName varchar(255), trainer_id int(10) NOT NULL, created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP ,updated timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, published timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Course Table created");
  });

  // create Course_details

  var sql =
    "CREATE TABLE `course_details` (`video_id` int AUTO_INCREMENT PRIMARY KEY,`course_id` int(10) NOT NULL,`article` varchar(1000) DEFAULT NULL,`reqm` varchar(1000) DEFAULT NULL,`images` varchar(1000) DEFAULT NULL,`long_desc` varchar(1000) DEFAULT NULL)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Course_details Table created");
  });

  // create Course Syllabus

  var sql =
    "CREATE TABLE `course_syllabus` ( course_syllabus_id int(20) AUTO_INCREMENT PRIMARY KEY NOT NULL, course_id int(10) NOT NULL, course_syllabus_name varchar(255) NOT NULL, course_video_id int(20) NOT NULL, embed_id int(20) NOT NULL, syllabus_desc varchar(255) NOT NULL)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Course Syllabus Table created");
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

  //   create Cust Profile

  var sql =
    "CREATE TABLE cust_profile (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL,gender varchar(10) NOT NULL, customer_id int(10) NOT NULL, whatsapp int(13) DEFAULT NULL, freelancer varchar(20) DEFAULT NULL, designation varchar(20) DEFAULT NULL, city varchar(20) DEFAULT NULL, state_id varchar(20) DEFAULT NULL, fb_link varchar(1000) DEFAULT NULL, insta_link varchar(1000) DEFAULT NULL, salon varchar(30) DEFAULT NULL)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Cust_profile Table created");
  });

  // create Embedded Code

  var sql =
    "CREATE TABLE embedded_code (embed_id int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL, embed_code varchar(1000) DEFAULT NULL, duration int(100) DEFAULT NULL, video_id int(10) DEFAULT NULL, course_id int(10) DEFAULT NULL)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Embeded Code Table created");
  });

  // create Events

  var sql =
    "CREATE TABLE events (event_id int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL, event_title varchar(100) DEFAULT NULL, event_desc varchar(1000) DEFAULT NULL, cat_id int(10) DEFAULT NULL, tag_id int(10) DEFAULT NULL, date date DEFAULT NULL, start_time datetime DEFAULT NULL, end_time datetime DEFAULT NULL, trainer_id int(10) DEFAULT NULL, created timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(), updated timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(), published timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(), event_image varchar(1000) DEFAULT NULL)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Events Table created");
  });

  // create Orders

  var sql =
    "CREATE TABLE orders (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, user_id int(11) NOT NULL)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Orders Table created");
  });

  // create Order Details

  var sql =
    "CREATE TABLE order_details (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, order_id int(11) NOT NULL, product_id int(10) NOT NULL, quantity int(11) NOT NULL)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Order Details Code Table created");
  });

  // create Products

  var sql =
    "CREATE TABLE products (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, sku int(10) NOT NULL, title varchar(255) DEFAULT NULL, image varchar(255) DEFAULT NULL, images text DEFAULT NULL, description text DEFAULT NULL, price float DEFAULT NULL, quantity int(10) DEFAULT NULL, tax_id int(3) DEFAULT NULL, short_desc varchar(255) DEFAULT NULL, cat_id int(10) DEFAULT NULL, trainer_id int(10) DEFAULT NULL, tag_id int(10) DEFAULT NULL)";
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

  //create Trainer

  var sql =
    "CREATE TABLE trainer (`trainer_id` int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, `salution` varchar(20) DEFAULT NULL, `first_name` varchar(20) DEFAULT NULL, `second_name` varchar(20) DEFAULT NULL, `mobile` varchar(10) DEFAULT NULL, `passwrd` varchar(255) DEFAULT NULL, `role_id` int(10) DEFAULT NULL, `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(), `updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp())";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Trainer Table created");
  });

  //create Trainer_profile

  var sql =
    "CREATE TABLE trainer_profile (`id` int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, `gender` varchar(10) DEFAULT NULL, `customer_id` int(10) DEFAULT NULL, `whatsapp` int(13) DEFAULT NULL, `freelancer` varchar(20) DEFAULT NULL, `designation` varchar(20) DEFAULT NULL, `intro` varchar(1000) DEFAULT NULL, `city` varchar(20) DEFAULT NULL, `state_id` varchar(20) DEFAULT NULL, `fb_link` varchar(1000) DEFAULT NULL, `insta_link` varchar(1000) DEFAULT NULL, `salon` varchar(30) DEFAULT NULL, `affliate_id` int(10) DEFAULT NULL)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Trainer_profile Table created");
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

  //create video_details

  var sql =
    "CREATE TABLE video_details (`id` int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL, `clip_id` int(10) DEFAULT NULL, `ref_id` int(10) DEFAULT NULL, `course_id` int(10) DEFAULT NULL, `article_id` int(10) DEFAULT NULL)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("video_details Table created");
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

  // alter/adding foreign keys
  // alter category-nothing to alter
  // alter course

  // var sql = "ALTER TABLE course   ADD KEY `fk_cat_id1` (`cat_id`), ADD KEY `fk_tag_id` (`tag_id`), ADD KEY `fk_trainer_id` (`trainer_id`),    MODIFY `course_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20, ADD CONSTRAINT `fk_cat_id1` FOREIGN KEY (`cat_id`) REFERENCES `category` (`cat_id`) ON DELETE CASCADE ON UPDATE CASCADE, ADD CONSTRAINT `fk_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`) ON DELETE CASCADE ON UPDATE CASCADE, ADD CONSTRAINT `fk_trainer_id` FOREIGN KEY (`trainer_id`) REFERENCES `trainer` (`trainer_id`) ON DELETE CASCADE ON UPDATE CASCADE";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Course Table Altered");
  // });

  // alter course details-nothing to alter
  // alter course syllabus

  var sql =
    "ALTER TABLE `course_syllabus` ADD CONSTRAINT `fk_course_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE, ADD CONSTRAINT `fk_embed_id` FOREIGN KEY (`embed_id`) REFERENCES `embedded_code` (`embed_id`) ON DELETE CASCADE ON UPDATE CASCADE, ADD CONSTRAINT `fk_video_id` FOREIGN KEY (`course_video_id`) REFERENCES `video_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("course syllabus Table Altered");
  });

  // alter customer

  // var sql = "ALTER TABLE customer ADD CONSTRAINT fk_cust_id FOREIGN KEY (role_id) REFERENCES roles (role_id) ON DELETE CASCADE ON UPDATE CASCADE, ADD CONSTRAINT fk_custdgid FOREIGN KEY (disc_group_id) REFERENCES discount_group (id) ON DELETE CASCADE ON UPDATE CASCADE";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("customer Table Altered");
  // });

  // alter customer address table

  var sql =
    "ALTER TABLE customer_address ADD CONSTRAINT fk_cust_a_id FOREIGN KEY (customer_id) REFERENCES customer (customer_id) ON DELETE CASCADE ON UPDATE CASCADE";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("customer address Table Altered");
  });

  // alter customer profile- nothing to alter
  // alter embedded code - nothing to alter
  // alter events - nothing to alter

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

  // create pos_development table

  var sql =
    "CREATE TABLE pos_development (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, customer_id int(10) NOT NULL, shipping_id int(10), billing_id int(10), total int(10), sub_total float, total_cgst float,total_sgst float,total_igst float, created timestamp NOT NULL DEFAULT current_timestamp(), updated timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp())";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("pos_development Table created");
  });

  // create pos_development detail table

  var sql =
    "CREATE TABLE pos_development_detail (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, quotation_id int(10), product_id int(10), quantity int(10), price float, tax_id int(3), tax_rate int(3), price_after_tax float, discount int(10), line_discount_price float, igst float, cgst float, sgst float, line_total float)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("pos_development detail Table created");
  });

  // create pos table

  var sql =
    "CREATE TABLE pos (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, customer_id int(10) NOT NULL, shipping_id int(10), billing_id int(10), total int(10), sub_total float, total_cgst float,total_sgst float,total_igst float, created timestamp NOT NULL DEFAULT current_timestamp(), updated timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp())";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("pos Table created");
  });

  // create pos detail table

  var sql =
    "CREATE TABLE pos_detail (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, quotation_id int(10), product_id int(10), quantity int(10), price float, tax_id int(3), tax_rate int(3), price_after_tax float, discount int(10), line_discount_price float, igst float, cgst float, sgst float, line_total float)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("pos detail Table created");
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
