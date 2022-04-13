var express = require('express');
var _router = express.Router();
var multer = require('multer');
var path = require('path');
const {database} = require('../db/db');


// Add new Category
var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, '../../svpvod/svpvod/src/assets/cours_images');
    },
    filename:function(req,file,cb){
        const filename = Date.now()+'.'+file.originalname
        cb(null, filename );
    }
});



var upload = multer({storage:store,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
        }
    }})


_router.post('/uploadcour', upload.single('file'), async (req, res) => {
        database.table('course')
        .insert({
            OriginalImageName: req.file.originalname,
            UploadImageName: req.file.filename,
            title: req.body.title,
            small_desc: req.body.small_desc,
            cat_id: req.body.cat_id,
            tag_id: req.body.tag_id,
            Cur_id: req.body.cur_id,
            fee: req.body.fee,
            trainer_id: req.body.trainer_id

        })
        .then((newcat) => {
            console.log("new course id", newcat)
            res.json({
                message: `Course successfully added`,
                success: true,

            })
        })
        .catch(err => res.json(err));

    });


// _router.post('/download', function(req,res,next){
//     filepath = path.join(__dirname,'../uploads') +'/'+ req.body.filename;
//     res.sendFile(filepath);
// });




_router.post('/updateCour', upload.single('file'), async (req, res) => {
    console.log('course ID',req.body.course_id)
    console.log('cat ID',req.body.cat_id)
    console.log('all',req.body)
    const courseid = req.body.course_id;

    database.table('course')
    .filter({ course_id :  courseid  })
    .update({
        OriginalImageName: req.file.originalname,
        UploadImageName: req.file.filename,
        title: req.body.title,
        small_desc: req.body.small_desc,
        cat_id: req.body.cat_id,
        tag_id: req.body.tag_id,
        Cur_id: req.body.cur_id,
        fee: req.body.fee,
        trainer_id: req.body.trainer_id
    })
    .then((newcat) => {
        console.log("Updated course id", newcat)
        res.json({
            message: `Course successfully updated`,
            success: true,

        })
    })
    .catch(err => res.json(err));

});


// router.get('/singletemp/:Id', (req, res) => {
//     let Id = req.params.Id;
//         database.table('quotetemplate as q')
//         .withFields(['q.total',
//         'q.templateName',



_router.delete('/deletecour/:id', (req, res) => {

        console.log("body",req.body)
    console.log("params", req.params)

    //const courseid = req.body.courseid;
    console.log('req b',req.body)


    database.table('course')
    .filter({ course_id :  req.params.id  })
    .remove()
    .then((newcat) => {
        console.log("Deleted course id", newcat)
        res.json({
            message: `Course deleted successfully`,
            success: true,

        })
    })
    .catch(err => res.json(err));

});

// const deleteSupplier = (req, res) => {
//     //console.log("body",req.body)
//     //console.log("params", req.params)


//     database.table('suppliers')
//         .filter({
//             id_supplier: req.params.id
//         })
//         .remove()
//         .then(successNum => {
//             res.json({
//                 success: true
//             })
//         }).catch(err => res.json({
//             success: false,
//             errorMsg: err
//         }));

// }

// router.delete('/delete/:id', supplierController.deleteSupplier)


module.exports = _router;