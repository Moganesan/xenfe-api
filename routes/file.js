var express = require('express');
var _router = express.Router();
var multer = require('multer');
var path = require('path');
const {database} = require('../db/db');


// Add new Category
var store = multer.diskStorage({
    destination:function(req,file,cb){
        //cb(null, '../../svpvod/svpvod/src/assets/images');
        cb(null, '../xenfe_front/src/assets/images');

    },
    filename:function(req,file,cb){
        const filename = Date.now()+'.'+file.originalname
        cb(null, filename );
    }
});



var upload = multer({storage:store,
    fileFilter: (req, file, cb) => {
        console.log('file', file)
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
        }
    }})

_router.post('/upload', upload.single('file'), async (req, res) => {

    console.log('data', req.file)

        database.table('category')
        
        .insert({
            cat_name: req.body.cat_name,
            cat_desc: req.body.cat_desc,
            OriginalImageName: req.file.originalname,
            UploadImageName: req.file.filename,
        })
        .then((newcat) => {
            console.log("new category id", newcat)
            res.json({
                message: `Category successfully added`,
                success: true,

            })
        })
        .catch(err => res.json(err));

    });

// category update
    _router.post('/categoryUpdate', async (req, res) => {

        console.log('data', req.body)
    
            database.table('category as c')
            .filter({ 'c.cat_id': req.body.id })            
            .update({
                cat_name: req.body.name,
                cat_desc: req.body.description,
            })
            .then((newcat) => {
                console.log("new category id", newcat)
                res.json({
                    message: `Category successfully updated`,
                    success: true,
                })
            })
            .catch(err => res.json(err));
    
        });


        // category update
    _router.post('/categoryUpdateFile', upload.single('file'), async (req, res) => {

        console.log('data', req.file)
    
            database.table('category as c')
            .filter({ 'c.cat_id': req.body.id })            
            .update({
                OriginalImageName: req.file.originalname,
                UploadImageName: req.file.filename,
            })
            .then((newcat) => {
                console.log("new category id", newcat)
                res.json({
                    message: `Category successfully updated`,
                    success: true,
                })
            })
            .catch(err => res.json(err));
    
        });


    _router.post('/productCreate', upload.single('file'), async (req, res) => {
        console.log("content", req.body)
        console.log("file", req.file)
        database.table('products')
        .filter({ 'c.cat_id': req.body.id })            
        .insert({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            tax_id: req.body.tax_id,
            short_desc: req.body.small_desc,
            tag_id: req.body.tag_id,
            cat_id: req.body.cat_id,
            quantity: req.body.quantity,
            image: req.file.originalname,
            upload_image_name: req.file.filename,
        })
        .then((newprod) => {
            console.log("new product id", newprod)
            res.json({
                message: `Product successfully added`,
                success: true,

            })
        })
        .catch(err => res.json(err));

    });


    _router.post('/productUpdate', async (req, res) => {
        console.log("content", req.body)
        database.table('products as p')
        .filter({ 'p.id': req.body.id })            
        .update({
            title: req.body.name,
            description: req.body.description,
            price: req.body.price,
            tax_id: req.body.tax_id,
            short_desc: req.body.short_desc,
            tag_id: 1,
            cat_id: req.body.cat_id,
            quantity: req.body.quantity,

        })
        .then((newprod) => {
            console.log("product id", newprod)
            res.json({
                message: `Product successfully added`,
                success: true,

            })
        })
        .catch(err => res.json(err));

    });



    _router.post('/productUpdatefile', upload.single('file'), async (req, res) => {
        console.log("content", req.body)
        console.log("file", req.file)
        database.table('products as p')
        .filter({ 'p.id': req.body.id })            
        .update({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            tax_id: req.body.tax_id,
            short_desc: req.body.small_desc,
            tag_id: 1,
            cat_id: req.body.cat_id,
            quantity: req.body.quantity,
            image: req.file.originalname,
            upload_image_name: req.file.filename,
        })
        .then((newprod) => {
            console.log("product id", newprod)
            res.json({
                message: `Product successfully added`,
                success: true,

            })
        })
        .catch(err => res.json(err));

    });


// _router.post('/download', function(req,res,next){
//     filepath = path.join(__dirname,'../uploads') +'/'+ req.body.filename;
//     res.sendFile(filepath);
// });



module.exports = _router;