const express = require('express');
const {check, validationResult, body} = require('express-validator');
const router = express.Router();
const helper = require('../db/db');
const jwt = require('jsonwebtoken');
const createError = require('http-errors')
const bcrypt = require('bcryptjs');
const {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
  } = require('../helper/jwt_helper')

const Mysqli = require('mysqli');

let conn = new Mysqli({
    Host: 'localhost', // IP/domain name
    post: 3306, // port, default 3306
    user: 'xenfe', // username
    passwd: 'xenfeadmin', // password
    db: 'xenfe'
});

let db = conn.emit(false, '');


//jwt auth
// router.get('/jwt',auth,  function (req, res){
//     res.status(200).send("Welcome 🙌 ");
// });

// CUST LOGIN ROUTE
router.post('/login', [helper.hasAuthFields, helper.isPasswordAndMobileMatch], async (req, res) => {
    const myMobile = req.body.mobile;
    const mob = await db.table('customer').filter({ mobile :  myMobile  }).get();

    let userid = mob.customer_id;
    let roleid = mob.role_id;
    let token = jwt.sign({state: 'true', mobile: req.body.mobile}, helper.secret, {
        algorithm: 'HS512',
        expiresIn: '1h'
    });
    let refreshtoken = jwt.sign({state: 'true', mobile: req.body.mobile}, helper.refreshsecret, {
        algorithm: 'HS512',
        expiresIn: '60000'
    });
    res.json({token: token, refreshtoken: refreshtoken, auth: true, mobile: req.body.mobile, userid: userid, roleid: roleid});
});


// TNR LOGIN ROUTE
router.post('/tnr/login', [helper.hasAuthFields, helper.isPasswordAndMobileMatchTrainer], async (req, res) => {
    const myMobile = req.body.mobile;
    const mob = await db.table('trainer').filter({ mobile :  myMobile  }).get();

    let userid = mob.trainer_id;
    let roleid = mob.role_id;
    let first_name = mob.first_name;
    let second_name = mob.second_name;
    let token = jwt.sign({state: 'true', mobile: req.body.mobile}, helper.secret, {
        algorithm: 'HS512',
        expiresIn: '6000'
    });
    res.json({token: token, auth: true, mobile: req.body.mobile, first_name: first_name, second_name: second_name, userid: userid});
});


// Add new Customer Address
router.post('/custRegister', [
    check('Data.LIMobile').isNumeric().not().isEmpty().withMessage('Field can\'t be empty')
    .isLength({min: 10}).withMessage("must be 10 characters long"),
    check('Data.LIPassword').escape().trim().not().isEmpty().withMessage('Field can\'t be empty')
        .isLength({min: 6}).withMessage("must be 6 characters long"),
    body('Data.LIMobile').custom(value => {
        return helper.database.table('customer').filter({ mobile : {  $in : [ value ]  } }).get().then(user => {
            if (user) {
                console.log(user);
                return Promise.reject('Mobile number already exists, choose another one.');
            }
        })
    })
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    } else {

        let mobile = req.body.Data.LIMobile;
        let passwrd = await bcrypt.hash(req.body.Data.LIPassword, 10);
        let first_name = req.body.Data.LIFirstName;
        let second_name = req.body.Data.LISecondName;
        let salution = req.body.Data.LISalution;

        helper.database.table('customer').insert({
            mobile: mobile,
            passwrd: passwrd,
            salution: salution,
            role_id: 1,
            disc_group_id: 3,
            second_name: second_name || null,
            first_name: first_name || null
         })
        .then((newcust) => {
            console.log("new customer", newcust)

            console.log("new customer id", newcust.insertId)

            helper.database.table('customer_address')
            .insert({
                customer_id: newcust.insertId,
                branch: req.body.Data.Branch,
                salution: req.body.Data.Salution,
                first_name: req.body.Data.FirstName,
                second_name: req.body.Data.SecondName,
                company_name: req.body.Data.CompanyName,
                gstin: req.body.Data.GSTIN,
                address1: req.body.Data.AddressLine1,
                address2: req.body.Data.AddressLine2,
                city: req.body.Data.City,
                pincode: req.body.Data.Pincode,
                state_id: req.body.Data.State,
                country_id: req.body.Data.Country,
                landline: req.body.Data.Landline,
                mobile: req.body.Data.Mobile,
                whatsapp: req.body.Data.WhatsApp,
            }).then((newadd) => {
                console.log("new category id", newadd)

            }).catch(err => res.json(err));
            res.json({
                message: `successfully added`,
                success: true,

            })
        })
        .catch(err => res.status(433).json({error: err}));
    }
});


// TNR LOGIN ROUTE
router.post('/refresh-token',async (req, res, next) => {
    try {
      const { refreshToken } = req.body
      if (!refreshToken) throw createError.BadRequest()
      const userId = await verifyRefreshToken(refreshToken)

      const accessToken = await signAccessToken(userId)
      const refToken = await signRefreshToken(userId)
      res.send({ accessToken: accessToken, refreshToken: refToken })
    } catch (error) {
      next(error)
    }
  });



// CUST REGISTER ROUTE
router.post('/register', [
    check('mobile').isNumeric().not().isEmpty().withMessage('Field can\'t be empty')
    .isLength({min: 10}).withMessage("must be 10 characters long"),
    check('passwrd').escape().trim().not().isEmpty().withMessage('Field can\'t be empty')
        .isLength({min: 6}).withMessage("must be 6 characters long"),
    body('mobile').custom(value => {
        return helper.database.table('customer').filter({ mobile : {  $in : [ value ]  } }).get().then(user => {
            if (user) {
                console.log(user);
                return Promise.reject('Mobile number already exists, choose another one.');
            }
        })
    })
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    } else {

        let mobile = req.body.mobile;
        let passwrd = await bcrypt.hash(req.body.passwrd, 10);
        let first_name = req.body.first_name;
        let second_name = req.body.second_name;
        let salution = req.body.salution;

        helper.database.table('customer').insert({
            mobile: mobile,
            passwrd: passwrd,
            salution: salution,
            role_id: 1,
            disc_group_id: 3,
            second_name: second_name || null,
            first_name: first_name || null
         })
        .then((newcust) => {
            console.log("new customer id", newcust)
            res.json({
                message: `successfully added`,
                success: true,

            })
        })
        .catch(err => res.status(433).json({error: err}));
    }
});




// TNR REGISTER ROUTE
router.post('/tnr/register', [
    check('mobile').isNumeric().not().isEmpty().withMessage('Field can\'t be empty')
    .isLength({min: 10}).withMessage("must be 10 characters long"),
    check('passwrd').escape().trim().not().isEmpty().withMessage('Field can\'t be empty')
        .isLength({min: 6}).withMessage("must be 6 characters long"),
    body('mobile').custom(value => {
        return helper.database.table('trainer').filter({ mobile : {  $in : [ value ]  } }).get().then(user => {
            if (user) {
                console.log(user);
                return Promise.reject('Mobile number already exists, choose another one.');
            }
        })
    })
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    } else {

        let mobile = req.body.mobile;
        let passwrd = await bcrypt.hash(req.body.passwrd, 10);
        let first_name = req.body.first_name;
        let second_name = req.body.second_name;
        let salution = req.body.salution;

        helper.database.table('trainer').insert({
            mobile: mobile,
            passwrd: passwrd,
            salution: salution,
            role_id: 2,
            second_name: second_name || null,
            first_name: first_name || null
         })
        .then((newtnr) => {
            console.log("new trainer id", newtnr)
            res.json({
                message: `successfully added`,
                success: true,

            })
        })
        .catch(err => res.status(433).json({error: err}));
    }
});




// Add new Customer only login details
router.post('/custRegister1', [
    check('Data.LIMobile').isNumeric().not().isEmpty().withMessage('Field can\'t be empty')
    .isLength({min: 10}).withMessage("must be 10 characters long"),
    check('Data.LIPassword').escape().trim().not().isEmpty().withMessage('Field can\'t be empty')
        .isLength({min: 6}).withMessage("must be 6 characters long"),
    body('Data.LIMobile').custom(value => {
        return helper.database.table('customer').filter({ mobile : {  $in : [ value ]  } }).get().then(user => {
            if (user) {
                console.log(user);
                return Promise.reject('Mobile number already exists, choose another one.');
            }
        })
    })
], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    } else {

        let mobile = req.body.Data.LIMobile;
        let passwrd = await bcrypt.hash(req.body.Data.LIPassword, 10);
        let first_name = req.body.Data.LIFirstName;
        let second_name = req.body.Data.LISecondName;
        let salution = req.body.Data.LISalution;

        helper.database.table('customer').insert({
            mobile: mobile,
            passwrd: passwrd,
            salution: salution,
            role_id: 1,
            disc_group_id: 3,
            second_name: second_name || null,
            first_name: first_name || null
         })
         .then((newadd) => {
            console.log("new customer id", newadd)

        }).catch(err => res.json(err));
        res.json({
            message: `successfully added`,
            success: true,

        })
    }
});


module.exports = router;
