const express = require('express');
const router = express.Router();
const {database} = require('../db/db');


//get all category
router.get('/', function (req, res) {  // Sending Page Query Parameter is mandatory http://localhost:3636/api/course?page=1

    database.table('category as cg')
        .withFields(['cg.cat_id',
            'cg.cat_name as category',
            'cg.cat_desc',
            'cg.OriginalImageName',
            'cg.UploadImageName'
        ])
        .sort({cat_id: .1})
        .getAll()
        .then(cgt => {
            if (cgt.length > 0) {
                res.status(200).json({
                    count: cgt.length,
                    category: cgt
                });
            } else {
                res.json({ message: "No Category found"});
            }
        })
        .catch(err => console.log(err));
});

/* GET ONE CATEGORY*/
router.get('/:courId', (req, res) => {
    let categoryId = req.params.courId;
    database.table('category as v')
        .withFields(['v.cat_id',
            'v.cat_name',
            'v.cat_desc',
            'v.OriginalImageName',
            'v.UploadImageName'
        ])
        .filter({'v.cat_id': categoryId})
        .get()
        .then(cour => {
            console.log(cour);
            if (cour) {
                res.status(200).json(cour);
            } else {
                res.json({message: `No category found with id ${categoryId}`});
            }
        }).catch(err => res.json(err));
});

// Add new category
router.post('/addNewCategory', async (req, res) => {

    database.table('category')
        .insert({
            cat_name: req.body.cat_name,
            cat_desc: req.body.cat_desc,
            image: req.body.image
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

module.exports = router;
