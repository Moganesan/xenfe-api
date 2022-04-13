/*
* GET home page.
*/

router.post('/', function (req, res) {
    message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var title= post.title;
      var small_desc= post.body.small_desc;
      var cat_id= post.cat_id;
      var tag_id= post.tag_id;
      var cur_id= post.cur_id;
      var fee= post.fee;
      var thumbnail= post.thumbnail;
      var trainer_id= post.trainer_id;


	  if (!req.files)
				return res.status(400).send('No files were uploaded.');

		var file = req.file.uploaded_image;
		var thumbnail=file.name;

	  	 if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){

              file.mv('public/images/upload_images/'+file.name, function(err) {

	              if (err)

	                return res.status(500).send(err);
      					var sql = "INSERT INTO `course`(`title`,`small_desc`,`cat_id`,`tag_id`, `cur_id` ,`fee` ,`thumbnail` , `trainer_id`) VALUES ('" + title + "','" + small_desc + "','" + cat_id + "','" + tag_id + "','" + cur_id + "','" + fee + "','" + thumbnail + "','" + trainer_id + "')";

    						var query = db.query(sql, function(err, result) {
    							 res.redirect('profile/'+result.insertId);
    						});
					   });
          } else {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('index.ejs',{message: message});
          }
   } else {
      res.render('index');
   }

});






