const express = require('express');
const router = express.Router();
const {database} = require('../db/db');


//get all tags
router.get('/', function (req, res) {  // Sending Page Query Parameter is mandatory http://localhost:3636/api/course?page=1

    database.table('tags as tg')
        .withFields([
            'tg.tag_id',
            'tg.tag_name',
            'tg.cat_id',
            ])
        .sort({cat_id: .1})
        .getAll()
        .then(cgt => {
            if (cgt.length > 0) {
                res.status(200).json({
                    count: cgt.length,
                    tags: cgt
                });
            } else {
                res.json({ message: "No Tags found"});
            }
        })
        .catch(err => console.log(err));
});


/* GET ONE TAG*/
router.get('/:courId', (req, res) => {
    let tagId = req.params.courId;
    database.table('tags as t')
        .withFields(['t.tag_id',
            't.tag_name',
            't.cat_id'
        ])
        .filter({'t.tag_id': tagId})
        .get()
        .then(cour => {
            console.log(cour);
            if (cour) {
                res.status(200).json(cour);
            } else {
                res.json({message: `No tag found with id ${tagId}`});
            }
        }).catch(err => res.json(err));
});

//GET ALL TAGS BT CATEGORY ID

router.get('/cat/:catid', (req, res) => { // Sending Page Query Parameter is mandatory http://localhost:3636/api/products/category/categoryName?page=1
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;   // check if page query param is defined or not
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 10;   // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit;      // 0, 10, 20, 30
        endValue = page * limit;                  // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 10;
    }

// Get category id value from param
    const catid = req.params.catid;
database.table('tags as s')
        .withFields([
            's.tag_id',
            's.tag_name as Tag',
            's.cat_id'
        ])
             .filter({'s.cat_id': catid})
        .slice(startValue, endValue)
        .sort({tag_id: .1})
        .getAll()
        .then(cours => {
            if (cours.length > 0) {
                res.status(200).json({
                    count: cours.length,
                    tags: cours
                });
            } else {
                res.json({
                    message: "No Tags found"
                });
            }
        })
        .catch(err => console.log(err));
    });

module.exports = router;
