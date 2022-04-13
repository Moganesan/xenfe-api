const express = require('express');
const router = express.Router();
const {database} = require('../db/db');

//get all Products
router.get('/', function (req, res) {  // Sending Page Query Parameter is mandatory http://localhost:3636/api/products


    database.table('products as p')
        // .join([
        //     {
        //         table: "category as c",
        //         on: `c.cat_id = p.cat_id`
        //     },
        //     {
        //         table: "tags as s",
        //         on: `s.tag_id = p.tag_id`
        //     },
        //     {
        //         table: "trainer as t",
        //         on: `t.trainer_id = p.trainer_id`
        //     }
        // ])
        .withFields([
            // 'c.cat_id',
            // 'c.cat_name',
            // 's.tag_id',
            // 's.tag_name',
            // 't.trainer_id',
            // 't.first_name as trainer',
            // 't.second_name',
            'p.id',
            'p.title as name',
            'p.image',
            'p.upload_image_name',
            'p.description',
            'p.price',
            'p.quantity',
            'p.short_desc'
        ])
        .sort({id: .1})
        .getAll()
        .then(cours => {
            if (cours.length > 0) {
                res.status(200).json({
                    count: cours.length,
                    products: cours
                });
            } else {
                res.json({ message: "No Products found"});
            }
        })
        .catch(err => console.log(err));
});



/* GET ONE PRODUCT*/
router.get('/:prodId', (req, res) => {
    let productId = req.params.prodId;
    console.log('test',productId )

    database.table('products as p')
    .join([
        // {
        //     table: "category as c",
        //     on: `c.cat_id = p.cat_id`
        // },
        // {
        //     table: "tags as s",
        //     on: `s.tag_id = p.tag_id`
        // },
        // {
        //     table: "trainer as t",
        //     on: `t.trainer_id = p.trainer_id`
        // },
        {
            table: "tax as d",
            on: `d.tax_rate_id = p.tax_id`
        }
    ])
    .withFields([
        // 'c.cat_id',
        // 'c.cat_name',
        // 's.tag_id',
        // 's.tag_name',
        // 't.trainer_id',
        // 't.first_name as trainer',
        // 't.salution',
        // 't.second_name',
        'p.id',
        'p.title as name',
        'p.image',
        'p.upload_image_name',
        'p.description',
        'p.price',
        'p.quantity',
        'p.short_desc',
        'p.tax_id',
        'p.cat_id',
        'd.tax_rate'
    ])
        .filter({'p.id': productId})
        .get()
        .then(cour => {
            console.log(cour);
            if (cour) {
                res.status(200).json(cour);
            } else {
                res.json({message: `No product found with id ${productId}`});
            }
        }).catch(err => res.json(err));
});

// get tax rate

router.get('/tax/:taxId', (req, res) => {
    let taxId = req.params.taxId;
    database.table('tax as t')
    .withFields([
        't.tax_name',
        't.tax_rate'
    ])
        .filter({'t.tax_rate_id': taxId})
        .get()
        .then(tax => {
            console.log(tax);
            if (tax) {
                res.status(200).json(tax);
            } else {
                res.json({message: `No tax found with id ${taxId}`});
            }
        }).catch(err => res.json(err));
});


// get tax rule

router.get('/taxRule/:taxId', (req, res) => {
    let taxId = req.params.taxId;
    database.table('tax_rule as t')
    .withFields([
        't.tax_rule_name',
        't.tax_rate'
    ])
        .filter({'t.tax_rate_id': taxId})
        .getAll()
        .then(tax => {
            console.log(tax);
            if (tax) {
                res.status(200).json(tax);
            } else {
                res.json({message: `No tax found with id ${taxId}`});
            }
        }).catch(err => res.json(err));
});


// get all taxes

router.get('/taxes/all', (req, res) => {
    database.table('tax as t')
    .withFields([
        't.tax_rate_id',
        't.tax_name',
        't.tax_rate'
    ])
        .getAll()
        .then(tax => {
            console.log(tax);
            if (tax) {
                res.status(200).json(tax);
            } else {
                res.json({message: `No taxes found`});
            }
        }).catch(err => res.json(err));
});



// get all tax Rules

router.get('/taxRules/all', (req, res) => {
    database.table('tax_rule as t')
    .withFields([
        't.tax_rule_id',
        't.tax_rate_id',
        't.tax_rule_name',
        't.tax_rate'
    ])
        .getAll()
        .then(tax => {
            console.log(tax);
            if (tax) {
                res.status(200).json(tax);
            } else {
                res.json({message: `No tax rules found`});
            }
        }).catch(err => res.json(err));
});


// get all fields name

router.get('/productFields/all', (req, res) => {
    database.table('products')
.get()
    .then(list => {
    console.log(list) 
    // {
    //   name,
    //   column,
    //   unique,
    //   cardinality,
    //   collation,
    // }
    if (list) {
        res.status(200).json(list);
    } else {
        res.json({message: `No list found`});
    }
}).catch(err => res.json(err));

});


// add products bulk

router.post('/uploadBulkProducts/bulk'), (req, res) => {
    console.log('ALL', req.body);
    let { products } = req.body;

    products.forEach(p => {
        console.log('console p', p)
        // let inQuote = parseInt(p.inquote);

        // Insert order details w.r.t the newly created order Id
        database.table('products')
            .insert({
                title: p.title,
                description: p.description,
                quantity: p.quantity,
                price: p.price
            }).catch(err => console.log(err));
            res.json({ message: uploaded})

    });


}




module.exports = router;
