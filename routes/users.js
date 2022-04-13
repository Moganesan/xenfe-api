const express = require('express');
const router = express.Router();
const {database} = require('../db/db');


//get all trainers
router.get('/', function (req, res) {  // Sending Page Query Parameter is mandatory http://localhost:3636/api/course?page=1

    database.table('trainer as tr')
        .withFields([
        'tr.trainer_id',
        'tr.salution',
        'tr.first_name',
        'tr.second_name',
        'tr.mobile',
        'tr.passwrd',
        'tr.role_id',
        'tr.created',
        'tr.updated'
        ])
        .sort({trainer_id: .1})
        .getAll()
        .then(cgt => {
            if (cgt.length > 0) {
                res.status(200).json({
                    count: cgt.length,
                    trainers: cgt
                });
            } else {
                res.json({ message: "No Trainers found"});
            }
        })
        .catch(err => console.log(err));
});

// Get Single Trainer
router.get('/singleTrainer/:trainerId', function (req, res) {  // Sending Page Query Parameter is mandatory http://localhost:3636/api/course?page=1
    let trainerId = req.params.trainerId;
    database.table('trainer as tr')
        .withFields([
        'tr.trainer_id',
        'tr.salution',
        'tr.first_name',
        'tr.second_name',
        'tr.mobile',
        'tr.passwrd',
        'tr.role_id',
        'tr.created',
        'tr.updated'
        ])
        .filter({'tr.trainer_id': trainerId})
        .get()
        .then(cgt => {
            if (cgt.length > 0) {
                res.status(200).json({
                    count: cgt.length,
                    trainers: cgt
                });
            } else {
                res.json({ message: "No Trainers found"});
            }
        })
        .catch(err => console.log(err));
});

module.exports = router;
