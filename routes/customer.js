const express = require('express');
const router = express.Router();
const { database } = require('../db/db');
const auth = require("../middleware/jwtauth");
const bcrypt = require('bcryptjs');


const {check, validationResult, body} = require('express-validator');


// get all cust name and mob

router.get('/test', (req, res) => {

    res.status(200).send("Welcome 🙌 ");


});


// get all cust name and mob

router.get('/all', (req, res) => {
    database.table('customer as c')

        .withFields(['c.first_name',
            'c.second_name',
            'c.mobile',
            'c.customer_id'
        ])
        .getAll()
        .then(custs => {
            if (custs.length > 0) {
                res.status(200).json({
                    customers_Details: custs
                });
            } else {
                res.json({
                    message: "No Customer detail found"
                });
            }
        })
        .catch(err => console.log(err));
});




// Add new Customer Address
router.post('/address/new', async (req, res) => {
    console.log(req.body)
    database.table('customer_address')
        .insert({
            customer_id: req.body.Data.customer_id,
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
            res.json({
                message: `Course successfully added`,
                success: true,

            })
        }).catch(err => res.json(err));

});


// get customers for the userid
router.get('/cd/:userid', (req, res) => {
    const userId = req.params.userid;

    database.table('customer as c')
        .join([{
            table: "customer_address as ca",
            on: `ca.customer_id = c.customer_id`
        }
        ])
        .withFields(['ca.first_name',
            'ca.second_name',
            'ca.company_name',
            'ca.mobile',
            'ca.branch',
            'ca.id'
        ])
        .filter({ 'c.customer_id': userId })
        .getAll()
        .then(custs => {
            if (custs.length > 0) {
                res.status(200).json({
                    customers_Details: custs
                });
            } else {
                res.json({
                    message: "No Customer detail found"
                });
            }
        })
        .catch(err => console.log(err));
});


// get addresss for customer id
router.get('/address/:addId', (req, res) => {
    const addId = req.params.addId;

    database.table('customer_address as ca')


    .join([{
        table: "ps_country as c",
        on: `ca.country_id = c.id_country`

    },{
        table: "ps_country_lang as cal",
        on: `cal.id_country = c.id_country`
    },{
            table: "ps_state as cs",
            on: `cs.id_state = ca.state_id`
    }
    ])
        .withFields([
            'ca.branch',
            'ca.address1',
            'ca.address2',
            'ca.city',
            'ca.pincode',
            'ca.state_id',
            'ca.country_id',
            'ca.first_name',
            'ca.second_name',
            'ca.company_name',
            'ca.mobile',
            'ca.id',
            'cal.name as country',
            'cs.name as State'
        ])
        .filter({ 'ca.customer_id': addId })
        .getAll()
        .then(ads => {
            console.log(ads)
            if (ads) {
                res.status(200).json(ads);
            } else {
                res.json({ message: `No customer address found with id ${addId}` });
            }
        }).catch(err => res.json(err));
});


// get addresss with its address id
router.get('/addressId/:addId', (req, res) => {
    const addId = req.params.addId;

    database.table('customer_address as ca')
    .join([
        {
            table: "ps_country as c",
            on: `ca.country_id = c.id_country`
        },{
            table: "ps_country_lang as cal",
            on: `cal.id_country = c.id_country`
        },{
                table: "ps_state as cs",
                on: `cs.id_state = ca.state_id`
        }
    ])


        .withFields([
            'ca.branch',
            'ca.address1',
            'ca.address2',
            'ca.city',
            'ca.pincode',
            'ca.state_id',
            'ca.country_id',
            'ca.first_name',
            'ca.second_name',
            'ca.company_name',
            'ca.mobile',
            'ca.id',
            'cal.name as country',
            'cs.name as state'
        ])
        .filter({ 'ca.id': addId })
        .get()
        .then(ads => {
            console.log(ads)
            if (ads) {
                res.status(200).json(ads);
            } else {
                res.json({ message: `No customer address found with id ${addId}` });
            }
        }).catch(err => res.json(err));
});





// get details of single user

router.get('/:custId', (req, res) => {
    let customerId = req.params.custId;
    database.table('customer as c')
        .withFields(['c.salution',
            'c.first_name',
            'c.second_name',
            'c.mobile',
            'c.customer_id',
            'c.disc_group_id',
            // 'c.default_ship_address',
            'c.default_bill_address'
        ])
        .filter({ 'c.customer_id': customerId })
        .get()
        .then(cust => {
            if (cust) {
                res.status(200).json({
                    customers_Details: cust
                });
            } else {
                res.json({ message: `No customer found with id ${customerId}` });
            }
        }).catch(err => res.json(err));
});


///////////////////////////////////////////////////////////////////////////////
//admin
//////////////////////////////////////////////////////////////////////////////


//get all country


router.get('/country/all', (req, res) => {
    database.table('ps_country as c')
        .join([{
            table: "ps_country_lang as ca",
            on: `ca.id_country = c.id_country`
        }
        ])
        .withFields(['c.id_country',
            'ca.name'
        ])
        .getAll()
        .then(custs => {
            if (custs.length > 0) {
                res.status(200).json({
                    countries: custs
                });
            } else {
                res.json({
                    message: "No Country found"
                });
            }
        })
        .catch(err => console.log(err));
});

//get all states with country id
router.get('/country/:id', (req, res) => {
    const Id = req.params.id;

    database.table('ps_state as c')
        .withFields(['c.id_state',
            'c.name'
        ])
        .filter({ 'c.id_country': Id })
        .getAll()
        .then(custs => {
            if (custs.length > 0) {
                res.status(200).json({
                    states: custs
                });
            } else {
                res.json({
                    message: "No states found"
                });
            }
        })
        .catch(err => console.log(err));
});


// post admin data
router.post('/adminData', async (req, res) => {

    console.log('input data',req.body)

    database.table('admin_information')
        .update({
            company_name: req.body.company_name,
            owner_name: req.body.owner_name,
            contact: req.body.contact,
            whats_app: req.body.whats_app,
            email: req.body.email,
            address_1: req.body.address_1,
            address_2: req.body.address_2,
            city: req.body.city,
            pincode: req.body.pincode,
            state_id: req.body.state_id,
            country_id: req.body.country_id,
            gtin: req.body.gstin,
        }).then((newcour) => {
            console.log("admin data", newcour)
            res.json({
                message: `admin data successfully added`,
                success: true,
            })
        }).catch(err => res.json(err));
});

// get admin data

router.get('/admin/:id', (req, res) => {
    const Id = req.params.id;

    database.table('admin_information as c')
    .join([
        {
            table: "ps_country as cz",
            on: `c.country_id = cz.id_country`
    
        },{
            table: "ps_country_lang as cal",
            on: `cal.id_country = cz.id_country`
        },{
                table: "ps_state as cs",
                on: `cs.id_state = c.state_id`
        }
    ])
        .withFields([
            'c.company_name',
            'c.owner_name',
            'c.contact',
            'c.whats_app',
            'c.email',
            'c.address_1',
            'c.address_2',
            'c.city',
            'c.pincode',
            'c.state_id',
            'c.country_id',
            'c.gtin',
            'c.id',
            'cal.name as country',
            'cs.name as state'
        ])
        .filter({ 'c.id': Id })
        .get()
        .then(quote => {
            if (quote) {
                res.status(200).json(quote);
                console.log('title name desc', quote)
            } else {
                res.json({ message: `No quotation detail found with id ${Id}` });
            }
        }).catch(err => res.json(err));
});


// Update admin data

router.post('/updateAdmin', (req, res) => {
    console.log('course ID', req.body.course_id)
    console.log('cat ID', req.body.cat_id)
    console.log('all', req.body)
    const courseid = req.body.course_id;

    database.table('admin_information')
        .insert({
            company_name: req.body.company_name,
            owner_name: req.body.owner_name,
            contact: req.body.contact,
            whats_app: req.body.whatsapp,
            email: req.body.email,
            address_1: req.body.add_1,
            address_2: req.body.add_2,
            city: req.body.city,
            pincode: req.body.pincode,
            state_id: req.body.state_id,
            country_id: req.body.country_id,
            gtin: req.body.gstin,
        }).then((newcour) => {
            console.log("admin data", newcour)
            res.json({
                message: `admin data successfully added`,
                success: true,
            })
        }).catch(err => res.json(err));

    database.table('course')
        .filter({ course_id: courseid })
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


// get all cust name and mob

router.get('/UnBilledCustomer/all', async (req, res) => {
    database.table('customer as c')
        .join([
            {
                table: "delivery_challan as dc",
                on: `c.customer_id = dc.customer_id`
            },
            {
                table: "delivery_challan_detail as dcd",
                on: `dcd.delivery_challan_id = dc.id`
            },
            {
                table: "customer_address as ca",
                on: `ca.id = dc.shipping_id`
            }
        ])
        .withFields(['c.first_name',
            'c.second_name',
            'c.mobile',
            'c.customer_id',
            'dc.shipping_id',
            'ca.branch',
            'dcd.id'
        ])
        .filter({ 'dcd.invoice_id': { $sql: 'IS NULL' } })
        .sort({ customer_id: .1 })
        .getAll()
        .then(custs => {
            const key2 = 'shipping_id';
            const arrayUniqueByKey1 = [...new Map(custs.map(item => [item[key2], item])).values()];
            if (arrayUniqueByKey1.length > 0) {
                res.status(200).json({
                    Data: arrayUniqueByKey1
                });
            } else {
                res.json({
                    message: "No Customer detail found"
                });
            }
        })
        .catch(err => console.log(err));
});



// get all cust name and mob

router.get('/UnBilled/:id', (req, res) => {
    const Id = req.params.id;
    database.table('delivery_challan_detail as dcd')
        .join([
            {
                table: "delivery_challan as dc",
                on: `dcd.delivery_challan_id = dc.id`
            },
            {
                table: "customer as c",
                on: `dc.customer_id = c.customer_id`
            },
            {
                table: "customer_address as ca",
                on: `dc.shipping_id = ca.id`
            },
            {
                table: "products as p",
                on: `dcd.product_id = p.id`
            }
        ])
        .withFields([
            'dc.id as dc_id',
            'dc.backorder_id',
            'p.title',
            'p.id',
            'dcd.quantity',
            'dcd.id as dcd_id',
            'dcd.price_after_discount',
            'dcd.line_total',
            'c.customer_id'
        ])
        .filter({ 'dc.shipping_id': Id, 'dcd.invoice_id': { $sql: 'IS NULL' } })
        // .filter({ 'dcd.invoice_id': { $sql: 'IS NULL' } })

        .getAll()
        .then(custs => {


            database.table('customer as ca')
        .join([
            {
                table: "customer_address as caa",
                on: `caa.customer_id = ca.customer_id`
            },
            {
                table: "ps_country as cz",
                on: `caa.country_id = cz.id_country`
        
            },{
                table: "ps_country_lang as cal",
                on: `cal.id_country = cz.id_country`
            },{
                    table: "ps_state as cs",
                    on: `cs.id_state = caa.state_id`
            }
        ])
        .withFields([
            'ca.first_name',
            'ca.mobile',
            'caa.branch',
            'caa.address1',
            'caa.address2',
            'caa.city',
            'caa.pincode',
            'caa.state_id',
            'caa.country_id',
            'ca.customer_id',
            'cal.name as country',
            'cs.name as state'
        ])
        .filter({ 'caa.id': Id })
        .get()
        .then(cd => {
            if (custs.length > 0) {
                res.status(200).json({
                    data: custs,
                    cusD: cd
                });
            } else {
                res.json({
                    message: "No Customer detail found"
                });
            }
        })
        .catch(err => console.log(err));
});
});


// Add new Customer Address
router.post('/register/new', [
    check('Data.LIMobile').isNumeric().not().isEmpty().withMessage('Field can\'t be empty')
    .isLength({min: 10}).withMessage("must be 10 characters long"),
    check('Data.LIPassword').escape().trim().not().isEmpty().withMessage('Field can\'t be empty')
        .isLength({min: 6}).withMessage("must be 6 characters long"),
    body('Data.LIMobile').custom(value => {
        return database.table('customer').filter({ mobile : {  $in : [ value ]  } }).get().then(user => {
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

        let mobile = req.body.Data.Mobile;
        let passwrd = await bcrypt.hash(req.body.passwrd, 10);
        let first_name = req.body.first_name;
        let second_name = req.body.second_name;
        let salution = req.body.salution;

        database.table('customer').insert({
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

            database.table('customer_address')
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





module.exports = router;
