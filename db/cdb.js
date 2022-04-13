var mysql = require("mysql");

// var con = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'xenfe',
//   password : 'xenfeadmin',
//   database: 'xenfe'
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

  //quote---------- id, user_id, sid, bid, total, created, updated
  //quote_detail--- qid, pid, quantity, price

  //   create customer address

  // create tax summary table

  var sql =
    "CREATE TABLE tax_summary (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, product_order_id int(3), tax_id int(3), subtotal float, cgst float, sgst float, igst float)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Tax Summary Table created");
  });

  // // create quotation detail table

  // var sql = "CREATE TABLE quotationActual_detail (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, quotation_id int(10), product_id int(10), quantity int(10), price float, tax_id int(3), tax_rate int(3), price_after_tax float, discount int(10), line_discount_price float, tax float,  line_total float)";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Quotation actual detail Table created");
  // });

  // var sql = "CREATE TABLE tax_summary (tax_summary_id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, quotation_id int(3), tax_id int(3), subtotal float, cgst float, sgst float, igst float)";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("tax summary Table created");
  // });

  // var sql = "CREATE TABLE discount_group (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, discount_name varchar(50), discount_value int(10))";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Quotation Table created");
  // });

  // alter customer address table

  // var sql = "ALTER TABLE admin_information ENGINE=InnoDB;";
  // var sql = "ALTER TABLE admin_information ADD CONSTRAINT fk_adinfo_id FOREIGN KEY (state_id) REFERENCES ps_state (id_state) ON DELETE CASCADE ON UPDATE CASCADE, ADD CONSTRAINT fk_addinfo_id FOREIGN KEY (country_id) REFERENCES ps_country (id_country) ON DELETE CASCADE ON UPDATE CASCADE" ;
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("admin_information Table Altered");
  // });

  // var sql = "ALTER TABLE quotation_detail ADD (tax_rate int(3), discount int(10), igst int(10), cgst int(10), sgst int(10), line_total int(10))" ;
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("quotation_detail Table Altered");
  // });

  // // create order table

  // var sql = "CREATE TABLE order (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, customer_id int(10) NOT NULL, shipping_id int(10), billing_id int(10), total int(10), sub_total float, total_cgst float,total_sgst float,total_igst float, created timestamp NOT NULL DEFAULT current_timestamp(), updated timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp())";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("order Table created");
  // });

  // // create order detail table

  // var sql = "CREATE TABLE order_detail (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, quotation_id int(10), product_id int(10), quantity int(10), price float, tax_id int(3), tax_rate int(3), price_after_tax float, discount int(10), line_discount_price float, igst float, cgst float, sgst float, line_total float)";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("order detail Table created");
  // });

  // create product_order table

  // var sql = "CREATE TABLE product_order (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, order_id int(10) NOT NULL, customer_id int(10) NOT NULL, shipping_id int(10), billing_id int(10) , round_total int(10), total int(10), sub_total float, total_cgst float,total_sgst float,total_igst float, created timestamp NOT NULL DEFAULT current_timestamp(), updated timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp())";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("product_order Table created");
  // });

  // create admin information table

  // var sql = "CREATE TABLE admin_information (id int(10) AUTO_INCREMENT PRIMARY KEY NOT NULL, company_name varchar(50), owner_name varchar(50), contact int(13), whats_app int(13), email varchar(255), address_1 varchar(255),address_2 varchar(255), city varchar(50), pincode int(10), state_id int(3), country_id int(3), gtin varchar(50))";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("admin information Table created");
  // });
});

//ALTER TABLE customer ADD KEY fk_cust_id (role_id) ADD CONSTRAINT fk_cust_id FOREIGN KEY (role_id) REFERENCES roles (role_id)

//ALTER TABLE `course_syllabus` ADD CONSTRAINT `fk_course_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`) ON DELETE CASCADE ON UPDATE CASCADE, ADD CONSTRAINT `fk_embed_id` FOREIGN KEY (`embed_id`) REFERENCES `embedded_code` (`embed_id`) ON DELETE CASCADE ON UPDATE CASCADE, ADD CONSTRAINT `fk_video_id` FOREIGN KEY (`course_video_id`) REFERENCES `video_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
