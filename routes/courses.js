const express = require('express');
const router = express.Router();
const {database} = require('../db/db');
const auth = require("../middleware/jwtauth");

//get all courses
router.get('/',auth,  function (req, res) {  // Sending Page Query Parameter is mandatory http://localhost:3636/api/course?page=1
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
    console.log('to test',req.body)
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 4; // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit; // 0, 10, 20, 30
        endValue = page * limit; // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 4;
    }

    database.table('course as v')
        .join([
            {
                table: "category as c",
                on: `c.cat_id = v.cat_id`
            },
            {
                table: "tags as s",
                on: `s.tag_id = v.tag_id`
            },
            {
                table: "trainer as t",
                on: `t.trainer_id = v.trainer_id`
            }
        ])
        .withFields(['c.cat_id',
            'c.cat_name as category',
            's.tag_id',
            's.tag_name as tag',
            't.trainer_id',
            't.first_name as trainer',
            'v.course_id',
            'v.title as name',
            'v.fee',
            'v.small_desc as description',
            'v.UploadImageName as image'
        ])
        .slice(startValue, endValue)
        .sort({course_id: .1})
        .getAll()
        .then(cours => {
            if (cours.length > 0) {
                res.status(200).json({
                    count: cours.length,
                    courses: cours
                });
            } else {
                res.json({ message: "No Courses found"});
            }
        })
        .catch(err => console.log(err));
});


//get all new courses
router.get('/new', function (req, res) {  // Sending Page Query Parameter is mandatory http://localhost:3636/api/course?page=1
    let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
    const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 4; // set limit of items per page
    let startValue;
    let endValue;
    if (page > 0) {
        startValue = (page * limit) - limit; // 0, 10, 20, 30
        endValue = page * limit; // 10, 20, 30, 40
    } else {
        startValue = 0;
        endValue = 4;
    }

    database.table('course as v')
        .join([
            {
                table: "category as c",
                on: `c.cat_id = v.cat_id`
            },
            {
                table: "tags as s",
                on: `s.tag_id = v.tag_id`
            },
            {
                table: "trainer as t",
                on: `t.trainer_id = v.trainer_id`
            }
        ])
        .withFields(['c.cat_id',
            'c.cat_name as category',
            's.tag_id',
            's.tag_name as tag',
            't.trainer_id',
            't.first_name as trainer',
            'v.course_id',
            'v.title as name',
            'v.fee',
            'v.small_desc as description',
            'v.UploadImageName as image'
        ])
        .slice(startValue, endValue)
        .sort({course_id: -1})
        .getAll()
        .then(cours => {
            if (cours.length > 0) {
                res.status(200).json({
                    count: cours.length,
                    courses: cours
                });
            } else {
                res.json({ message: "No Courses found"});
            }
        })
        .catch(err => console.log(err));
});

/* GET ONE COURSE*/
router.get('/:courId', (req, res) => {
    let courseId = req.params.courId;
    database.table('course as v')
        .join([
            {
                table: "category as c",
                on: `c.cat_id = v.cat_id`
            },
            {
                table: "tags as s",
                on: `s.tag_id = v.tag_id`
            },
            {
                table: "trainer as t",
                on: `t.trainer_id = v.trainer_id`
            }
        ])
        .withFields(['c.cat_id',
            'c.cat_name as category',
            's.tag_id',
            's.tag_name as tag',
            't.trainer_id',
            't.first_name as trainer',
            'v.course_id',
            'v.title as name',
            'v.fee',
            'v.small_desc as description',
            'v.UploadImageName as image',
            'v.cur_id'
        ])
        .filter({'v.course_id': courseId})
        .get()
        .then(cour => {
            if (cour) {
                res.status(200).json(cour);
            } else {
                res.json({message: `No product found with id ${courseId}`});
            }
        }).catch(err => res.json(err));
});



//GET COURSE BY CATEGORY
router.get('/category/:catid', (req, res) => { // Sending Page Query Parameter is mandatory http://localhost:3636/api/products/category/categoryName?page=1
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
    const categoryid = req.params.catid;
database.table('course as v')
        .join([{
                table: "category as c",
                on: `c.cat_id = v.cat_id`
            },
            {
                table: "tags as s",
                on: `s.tag_id = v.tag_id`
            },
            {
                table: "trainer as t",
                on: `t.trainer_id = v.trainer_id`
            }
        ])
        .withFields(['c.cat_id',
            'c.cat_name as category',
            's.tag_id',
            's.tag_name as Tag',
            't.trainer_id',
            't.first_name as trainer',
            'v.course_id',
            'v.title as name',
            'v.fee',
            'v.small_desc as description',
            'v.uploadImageName as image'
        ])
             .filter({'c.cat_id': categoryid})
        .slice(startValue, endValue)
        .sort({course_id: .1})
        .getAll()
        .then(cours => {
            if (cours.length > 0) {
                res.status(200).json({
                    count: cours.length,
                    courses: cours
                });
            } else {
                res.json({
                    message: "No Courses found"
                });
            }
        })
        .catch(err => console.log(err));
    });


    //GET ALL COURSES BY TAG ID
    router.get('/tag/:tagid', (req, res) => { // Sending Page Query Parameter is mandatory http://localhost:3636/api/products/category/categoryName?page=1
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
        const tagid = req.params.tagid;
    database.table('course as v')
            .join([{
                    table: "category as c",
                    on: `c.cat_id = v.cat_id`
                },
                {
                    table: "tags as s",
                    on: `s.tag_id = v.tag_id`
                },
                {
                    table: "trainer as t",
                    on: `t.trainer_id = v.trainer_id`
                }
            ])
            .withFields(['c.cat_id',
                'c.cat_name as category',
                's.tag_id',
                's.tag_name as Tag',
                't.trainer_id',
                't.first_name as trainer',
                'v.course_id',
                'v.title as name',
                'v.fee',
                'v.small_desc as description',
                'v.UploadImageName as image'
            ])
                 .filter({'s.tag_id': tagid})
            .slice(startValue, endValue)
            .sort({course_id: .1})
            .getAll()
            .then(cours => {
                if (cours.length > 0) {
                    res.status(200).json({
                        count: cours.length,
                        courses: cours
                    });
                } else {
                    res.json({
                        message: "No Courses found"
                    });
                }
            })
            .catch(err => console.log(err));
        });


        //GET ALL COURSES BY TRAINER ID

        router.get('/trainer/:trainerid', (req, res) => { // Sending Page Query Parameter is mandatory http://localhost:3636/api/products/category/categoryName?page=1
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
            const trainerid = req.params.trainerid;
        database.table('course as v')
                .join([{
                        table: "category as c",
                        on: `c.cat_id = v.cat_id`
                    },
                    {
                        table: "tags as s",
                        on: `s.tag_id = v.tag_id`
                    },
                    {
                        table: "trainer as t",
                        on: `t.trainer_id = v.trainer_id`
                    }
                ])
                .withFields(['c.cat_id',
                    'c.cat_name as category',
                    's.tag_id',
                    's.tag_name as Tag',
                    't.trainer_id',
                    't.first_name as trainer',
                    'v.course_id',
                    'v.title as name',
                    'v.fee',
                    'v.small_desc as description',
                    'v.UploadImageName as image'
                ])
                     .filter({'t.trainer_id': trainerid})
                .slice(startValue, endValue)
                .sort({course_id: .1})
                .getAll()
                .then(cours => {
                    if (cours.length > 0) {
                        res.status(200).json({
                            count: cours.length,
                            courses: cours
                        });
                    } else {
                        res.json({
                            message: "No Courses found"
                        });
                    }
                })
                .catch(err => console.log(err));
            });


// Add new course
router.post('/addNewCourse', async (req, res) => {

    database.table('course')
        .insert({
            title: req.body.title,
            small_desc: req.body.small_desc,
            cat_id: req.body.cat_id,
            tag_id: req.body.tag_id,
            cur_id: req.body.cur_id,
            fee: req.body.fee,
            thumbnail: req.body.file.name,
            trainer_id: req.body.trainer_id,
        }).then((newcour) => {
            console.log("new category id", newcour)
            res.json({
                message: `Course successfully added`,
                success: true,

            })
        }).catch(err => res.json(err));

    });





module.exports = router;
