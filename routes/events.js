const express = require('express');
const router = express.Router();
const {database} = require('../db/db');

//get all events
router.get('/', function (req, res) { // Sending Page Query Parameter is mandatory http://localhost:3636/api/Events?page=1
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

    database.table('events as e') 
        .join([{
                table: "category as c",
                on: `c.cat_id = e.cat_id`
            },
            {
                table: "tags as s",
                on: `s.tag_id = e.tag_id`
            },
            {
                table: "trainer as t",
                on: `t.trainer_id = e.trainer_id`
            }
        ])
        .withFields(['c.cat_id',
            'c.cat_name as category',
            's.tag_id',
            's.tag_name as tag',
            't.trainer_id',
            't.first_name as trainer',
            'e.event_id',
            'e.event_title',
            'e.start_time',
            'e.end_time',
            'e.event_desc',
            'e.event_image',

        ])
        .slice(startValue, endValue)
        .sort({event_id: -1})
        .getAll()
        .then(evnt => {
            if (evnt.length > 0) {
                res.status(200).json({
                    count: evnt.length,
                    events: evnt
                });
            } else {
                res.json({
                    message: "No Events found"
                });
            }
        })
        .catch(err => console.log(err));
    });


    /* GET ONE Event*/
router.get('/:evntId', (req, res) => {
    let evntId = req.params.evntId;
    database.table('events as e')
        .join([
            {
                table: "category as c",
                on: `c.cat_id = e.cat_id`
            },
            {
                table: "tags as s",
                on: `s.tag_id = e.tag_id`
            },
            {
                table: "trainer as t",
                on: `t.trainer_id = e.trainer_id`
            }
        ])
        .withFields(['c.cat_id',
        'c.cat_name as category',
        's.tag_id',
        's.tag_name as tag',
        't.trainer_id',
        't.first_name as trainer',
        'e.event_id',
        'e.event_title',
        'e.start_time',
        'e.end_time',
        'e.event_desc',
        'e.event_image',
        ])
        .filter({'e.event_id': evntId})
        .get()
        .then(evnt => {
            console.log(evnt);
            if (evnt) {
                res.status(200).json(evnt);
            } else {
                res.json({message: `No product found with id ${evntId}`});
            }
        }).catch(err => res.json(err));
});


    module.exports = router;
