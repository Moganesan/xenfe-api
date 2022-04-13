const express = require('express');
const router = express.Router();
const { database } = require('../db/db');
const {check, validationResult, body} = require('express-validator');



//get all templates
router.get('/', function (req, res) {  // Sending Page Query Parameter is mandatory http://localhost:3636/api/course?page=1
    // let page = (req.query.page !== undefined && req.query.page !== 0) ? req.query.page : 1;
    // console.log('to test',req.body)
    // const limit = (req.query.limit !== undefined && req.query.limit !== 0) ? req.query.limit : 4; // set limit of items per page
    // let startValue;
    // let endValue;
    // if (page > 0) {
    //     startValue = (page * limit) - limit; // 0, 10, 20, 30
    //     endValue = page * limit; // 10, 20, 30, 40
    // } else {
    //     startValue = 0;
    //     endValue = 4;
    // }

    database.table('quotetemplate as q')
        //  .join([
        //     {
        //         table: "customer as c",
        //         on: `c.customer_id = q.userId`
        //     }
        //  ])
        .withFields([
            'q.template_id',
            'q.templateName',
            'q.templateDesc',
            'q.total',
            'q.updated',
            // 'c.first_name',
            // 'c.second_name'
        ])
        //.slice(startValue, endValue)
        .sort({ template_id: .1 })
        .getAll()
        .then(temps => {
            if (temps.length > 0) {
                res.status(200).json({
                    count: temps.length,
                    templates: temps
                });
            } else {
                res.json({ message: "No Templates found" });
            }
        })
        .catch(err => console.log(err));
});


// Add new Quote Template
router.post('/new', async (req, res) => {
    // let userId = req.body.userId;
    // let data = JSON.parse(req.body);
    console.log('ALL', req.body);
    let { userid, templateName, templateDesc, quoteTempTotal, products } = req.body;
    //console.log('Products', products);
    database.table('quotetemplate')
        .insert({
            templateName: templateName,
            templateDesc: templateDesc,
            total: quoteTempTotal,
            userId: userid
        }).then((newTemplateId) => {
            console.log('new Template', newTemplateId.insertId)
            if (newTemplateId.insertId > 0) {
                products.forEach(p => {
                    console.log('console p', p)
                    // let inQuote = parseInt(p.inquote);

                    // Insert order details w.r.t the newly created order Id
                    database.table('quotetemplate_details')
                        .insert({
                            template_id: newTemplateId.insertId,
                            product_id: p.id,
                            quantity: p.inquote,
                            price: p.price
                        }).catch(err => console.log(err));
                });
            } else {
                res.json({ message: 'New Template failed while adding Template details', success: false });
            };
            res.json({
                message: `Template successfully placed with Template id ${newTemplateId.insertId}`,
                success: true,
                order_id: newTemplateId.insertId,
                products: products
            })
        }).catch((error) => {
            console.error("The Promise is rejected!", error);
        })
});




// get single template(title name total)

router.get('/singletemp/:Id', (req, res) => {
    let Id = req.params.Id;
    database.table('quotetemplate as q')
        .withFields(['q.total',
            'q.templateName',
            'q.templateDesc'
        ])
        .filter({ 'q.template_id': Id })
        .get()
        .then(quote => {
            if (quote) {
                res.status(200).json(quote);
                console.log('title name desc', quote)
            } else {
                res.json({ message: `No template found with id ${Id}` });
            }
        }).catch(err => res.json(err));
});

// get single quotation(name branch total)

router.get('/singleqte/:Id', (req, res) => {
    let Id = req.params.Id;
    database.table('pos_development as q')
        .join([
            {
                table: "customer as c",
                on: `q.customer_id = c.customer_id`
            },
            {
                table: "customer_address as ca",
                on: `q.shipping_id = ca.id`
            }
        ])
        .withFields(['q.total',
            'q.sub_total',
            'q.total_cgst',
            'q.total_sgst',
            'q.total_igst',
            'c.first_name as FirstName',
            'c.customer_id',
            'c.disc_group_id',
            'c.default_ship_address',
            'ca.branch',
            'ca.id',
            'ca.salution',
            'ca.first_name',
            'ca.second_name',
            'ca.company_name',
            'ca.gstin',
            'ca.address1',
            'ca.address2',
            'ca.city',
            'ca.pincode',
            'ca.state_id',
            'ca.country_id'
        ])
        .filter({ 'q.id': Id })
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

// get single quotation(name branch total) 1

router.get('/singleqte1/:Id', (req, res) => {
    let Id = req.params.Id;
    database.table('quotation as q')
        .join([
            {
                table: "customer as c",
                on: `q.customer_id = c.customer_id`
            },
            {
                table: "customer_address as ca",
                on: `q.shipping_id = ca.id`
            }
        ])
        .withFields(['q.total',
            'q.total_igst',
            'q.total_sgst',
            'q.total_cgst',
            'q.sub_total',
            'c.first_name as FirstName',
            'c.customer_id',
            'c.disc_group_id',
            'c.default_ship_address',
            'ca.branch',
            'ca.id',
            'ca.salution',
            'ca.first_name',
            'ca.second_name',
            'ca.company_name',
            'ca.gstin',
            'ca.address1',
            'ca.address2',
            'ca.city',
            'ca.pincode',
            'ca.state_id',
            'ca.country_id'
        ])
        .filter({ 'q.id': Id })
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




// get single backorder(name branch total) 1

router.get('/singlebo1/:Id', (req, res) => {
    let Id = req.params.Id;
    database.table('backorder as q')
        .join([
            {
                table: "customer as c",
                on: `q.customer_id = c.customer_id`
            },
            {
                table: "customer_address as ca",
                on: `q.shipping_id = ca.id`
            },
            {
                table: "ps_country as cz",
                on: `ca.country_id = cz.id_country`
        
            },{
                table: "ps_country_lang as cal",
                on: `cal.id_country = cz.id_country`
            },{
                    table: "ps_state as cs",
                    on: `cs.id_state = ca.state_id`
            }
        ])
        .withFields(['q.total',
            'q.total_quantity',
            'q.created',
            'c.first_name as FirstName',
            'c.customer_id',
            'c.disc_group_id',
            'c.default_ship_address',
            'ca.branch',
            'ca.id',
            'ca.salution',
            'ca.first_name',
            'ca.second_name',
            'ca.company_name',
            'ca.gstin',
            'ca.address1',
            'ca.address2',
            'ca.city',
            'ca.pincode',
            'ca.mobile',
            'ca.state_id',
            'ca.country_id',
            'cal.name as country',
            'cs.name as state'
        ])
        .filter({ 'q.id': Id })
        .get()
        .then(quote => {
            if (quote) {
                res.status(200).json(quote);
                console.log('title name desc', quote)
            } else {
                res.json({ message: `No backorder detail found with id ${Id}` });
            }
        }).catch(err => res.json(err));
});



// get single Order(name branch total) 1

router.get('/singleOrder/:Id', (req, res) => {
    let Id = req.params.Id;
    database.table('product_order as q')
        .join([
            {
                table: "customer as c",
                on: `q.customer_id = c.customer_id`
            },
            {
                table: "customer_address as ca",
                on: `q.shipping_id = ca.id`
            }
        ])
        .withFields(['q.total',
            'q.total_quantity',
            'q.created',
            'c.first_name as FirstName',
            'c.mobile',
            'c.customer_id',
            'c.disc_group_id',
            'c.default_ship_address',
            'ca.branch',
            'ca.id',
            'ca.salution',
            'ca.first_name',
            'ca.second_name',
            'ca.company_name',
            'ca.mobile as Mobile',
            'ca.gstin',
            'ca.address1',
            'ca.address2',
            'ca.city',
            'ca.pincode',
            'ca.state_id',
            'ca.country_id'
        ])
        .filter({ 'q.id': Id })
        .get()
        .then(quote => {
            if (quote) {
                res.status(200).json(quote);
                console.log('title name desc', quote)
            } else {
                res.json({ message: `No backorder detail found with id ${Id}` });
            }
        }).catch(err => res.json(err));
});




//get billing address for given quotation id

router.get('/billingAdd/:Id', (req, res) => {
    let Id = req.params.Id;
    database.table('quotation as q')
        .join([
            {
                table: "customer_address as ca",
                on: `q.billing_id = ca.id`
            }
        ])
        .withFields([
            'ca.branch',
            'ca.id',
            'ca.salution',
            'ca.first_name',
            'ca.second_name',
            'ca.company_name',
            'ca.gstin',
            'ca.address1',
            'ca.address2',
            'ca.city',
            'ca.pincode',
            'ca.state_id',
            'ca.country_id'
        ])
        .filter({ 'q.id': Id })
        .get()
        .then(quote => {
            if (quote) {
                res.status(200).json(quote);
                console.log('title name desc', quote)
            } else {
                res.json({ message: `No address found with id ${Id}` });
            }
        }).catch(err => res.json(err));
});

//get billing address for given quotation id1

router.get('/billingAdd1/:Id', (req, res) => {
    let Id = req.params.Id;
    database.table('quotation as q')
        .join([
            {
                table: "customer_address as ca",
                on: `q.billing_id = ca.id`
            }
        ])
        .withFields([
            'ca.branch',
            'ca.id',
            'ca.salution',
            'ca.first_name',
            'ca.second_name',
            'ca.company_name',
            'ca.gstin',
            'ca.address1',
            'ca.address2',
            'ca.city',
            'ca.pincode',
            'ca.state_id',
            'ca.country_id'
        ])
        .filter({ 'q.id': Id })
        .get()
        .then(quote => {
            if (quote) {
                res.status(200).json(quote);
                console.log('title name desc', quote)
            } else {
                res.json({ message: `No address found with id ${Id}` });
            }
        }).catch(err => res.json(err));
});




//get billing address for given quotation id1

router.get('/billingAdd2/:Id', (req, res) => {
    let Id = req.params.Id;
    database.table('product_order as q')
        .join([
            {
                table: "customer_address as ca",
                on: `q.billing_id = ca.id`
            },
            {
                table: "ps_country as cz",
                on: `ca.country_id = cz.id_country`
            },{
                table: "ps_country_lang as cal",
                on: `cal.id_country = cz.id_country`
            },{
                    table: "ps_state as cs",
                    on: `cs.id_state = ca.state_id`
            }
        ])
        .withFields([
            'ca.branch',
            'ca.id',
            'ca.salution',
            'ca.first_name',
            'ca.second_name',
            'ca.company_name',
            'ca.gstin',
            'ca.address1',
            'ca.address2',
            'ca.city',
            'ca.pincode',
            'ca.state_id',
            'ca.country_id',
            'ca.mobile',
            'cal.name as country',
            'cs.name as state'
        ])
        .filter({ 'q.id': Id })
        .get()
        .then(quote => {
            if (quote) {
                res.status(200).json(quote);
                console.log('title name desc', quote)
            } else {
                res.json({ message: `No address found with id ${Id}` });
            }
        }).catch(err => res.json(err));
});

//get billing address for given backorder id1

router.get('/billingAddBO1/:Id', (req, res) => {
    let Id = req.params.Id;
    database.table('backorder as q')
        .join([
            {
                table: "customer_address as ca",
                on: `q.billing_id = ca.id`
            },
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
            'ca.id',
            'ca.salution',
            'ca.first_name',
            'ca.second_name',
            'ca.company_name',
            'ca.gstin',
            'ca.address1',
            'ca.address2',
            'ca.city',
            'ca.pincode',
            'ca.state_id',
            'ca.country_id',
            'ca.mobile',
            'cal.name as country',
            'cs.name as state'

        ])
        .filter({ 'q.id': Id })
        .get()
        .then(quote => {
            if (quote) {
                res.status(200).json(quote);
                console.log('title name desc', quote)
            } else {
                res.json({ message: `No address found with id ${Id}` });
            }
        }).catch(err => res.json(err));
});


// get single Template_detail
router.get('/:Id', (req, res) => {
    let Id = req.params.Id;
    database.table('quotetemplate_details as qd')
        .join([
            {
                table: "quotetemplate as q",
                on: `q.template_id = qd.template_id`
            },
            {
                table: "products as p",
                on: `p.id = qd.product_id`
            }
        ])
        .withFields(['qd.template_id',
            'qd.id',
            'qd.quantity',
            'qd.price',
            'qd.product_id',
            'q.userId',
            'q.updated',
            'p.title',
            'qd.price'
        ])
        .filter({ 'qd.template_id': Id })
        .getAll()
        .then(cour => {
            if (cour) {
                res.status(200).json(cour);
                console.log(cour)
            } else {
                res.json({ message: `No template found with id ${Id}` });
            }
        }).catch(err => res.json(err));

});


// get single Template_detail
router.get('/DC/:Id', (req, res) => {
    let Id = req.params.Id;
    database.table('delivery_challan_detail as qd')
        .join([
            {
                table: "delivery_challan as q",
                on: `q.id = qd.delivery_challan_id`
            },
            {
                table: "products as p",
                on: `p.id = qd.product_id`
            }
        ])
        .withFields(['qd.delivery_challan_id',
            'qd.id',
            'qd.quantity',
            'qd.price',
            'qd.product_id',
            'q.customer_id',
            'q.updated',
            'p.title',
        ])
        .filter({ 'qd.template_id': Id })
        .getAll()
        .then(cour => {
            if (cour) {
                res.status(200).json(cour);
                console.log(cour)
            } else {
                res.json({ message: `No template found with id ${Id}` });
            }
        }).catch(err => res.json(err));

});


// Delete Single Template

router.delete('/deleteTemp/:id', (req, res) => {

    console.log("body", req.body)
    console.log("params", req.params)

    database.table('quotetemplate')
        .filter({ template_id: req.params.id })
        .remove()

    database.table('quotetemplate_details')
        .filter({ template_id: req.params.id })
        .remove()
        .then((tempD) => {
            console.log("Deleted Template id", tempD)
            res.json({
                message: `Template Details deleted successfully`,
                success: true,

            })
        })
        .catch(err => res.json(err));

});


//delete single product line from template detail table

router.delete('/deleteProdFrmTDT/:id', (req, res) => {
    console.log("body", req.body)
    console.log("params", req.params)
    database.table('quotetemplate_details')
        .filter({ id: req.params.id })
        .remove()
        .then((tempD) => {
            console.log("Deleted Template id", tempD)
            res.json({
                message: `Product from Template Details deleted successfully`,
                success: true,
            })
        })
        .catch(err => res.json(err));
});


//delete single product line from quotation detail table

router.delete('/deleteProdFrmQDT/:id', (req, res) => {
    console.log("body", req.body)
    console.log("params", req.params)
    database.table('pos_development_detail')
        .filter({ id: req.params.id })
        .remove()
        .then((tempD) => {
            console.log("Deleted quotation detail id", tempD)
            res.json({
                message: `Product from quotation Details table deleted successfully`,
                success: true,
            })
        })
        .catch(err => res.json(err));
});

//delete single product line from quotation detail table 1

// delete method

// router.delete('/deleteProdFrmQDT1/:id', (req, res) => {
//     console.log("body", req.body)
//     console.log("params", req.params)
//     database.table('quotation_detail')
//         .filter({ id: req.params.id })
//         .remove()
//         .then((tempD) => {
//             console.log("Deleted quotation detail id", tempD)
//             res.json({
//                 message: `Product from quotation Details deleted successfully`,
//                 success: true,
//             })
//         })
//         .catch(err => res.json(err));
// });

//delete single product line from quotation detail table 1 post

router.post('/deleteProdFrmQDT1', (req, res) => {
    console.log("body", req.body)
    // console.log("params", req.params)
    database.table('quotation_detail')
        .filter({ id: req.body.QDId })
        .remove()
        // .then((tempD) => {
        //     console.log("Deleted quotation detail id", tempD)
        //     res.json({
        //         message: `Product from quotation Details deleted successfully`,
        //         success: true,
        //     })
        // })

    database.table('quotation')
        .filter({ id: req.body.qid })
        .update({
            total: req.body.total,
        })

        .then((tempq) => {
            console.log("updated total", tempq)
            res.json({
                message: `total from quotation updated successfully`,
                success: true,
            })
        })
        .catch(err => res.json(err));
});


//delete single product line from backorder detail table 1 post

router.post('/deleteProdFrmBOT', (req, res) => {
    console.log("body", req.body)
    // console.log("params", req.params)
    database.table('backorder_detail')
        .filter({ id: req.body.QDId })
        .remove()
        // .then((tempD) => {
        //     console.log("Deleted backorder detail id", tempD)
        //     res.json({
        //         message: `Product from backorder Details deleted successfully`,
        //         success: true,
        //     })
        // })

    database.table('backorder')
        .filter({ id: req.body.qid })
        .update({
            total: req.body.total,
        })

        .then((tempq) => {
            console.log("updated total", tempq)
            res.json({
                message: `total from backorder updated successfully`,
                success: true,
            })
        })
        .catch(err => res.json(err));
});

//update single product line from template detail table

router.post('/updateProdFrmTDT', (req, res) => {

    console.log("body", req.body)
    // console.log("params", req.params)
    database.table('quotetemplate_details')
        .filter({ id: req.body.TemplateDetail_id })
        .update({
            quantity: req.body.quantity,
        })
    database.table('quotetemplate')
        .filter({ template_id: req.body.Template_id })
        .update({
            total: req.body.Total,
        })
        .then((tempD) => {
            console.log("Updated product Quantity in Template_details and total in template", tempD)
            res.json({
                message: `Product from Template Details and total in template updated successfully`,
                success: true,
            })
        })
        .catch(err => res.json(err));
});


//update single product line from quotation detail table

router.post('/updateProdFrmQDT', (req, res) => {

    console.log("body", req.body)
    // console.log("params", req.params)
    database.table('pos_development_detail')
        .filter({ id: req.body.quotationDetail_id })
        .update({
            quantity: req.body.quantity,
            discount: req.body.discount
        })
    database.table('pos_development')
        .filter({ id: req.body.quotation_id })
        .update({
            total: req.body.Total,
            sub_total: req.body.sub_total,
            total_cgst: req.body.total_cgst,
            total_sgst: req.body.total_sgst,
            total_igst: req.body.total_igst,
        })
        .then((tempD) => {
            console.log("Updated product Quantity and discount in quotation_detail and total in quotation", tempD)
            res.json({
                message: `Product from quotation Details and total in quotation updated successfully`,
                success: true,
            })
        })
        .catch(err => res.json(err));
});


//update single product line from quotation detail table 1

router.post('/updateProdFrmQDT1', (req, res) => {

    console.log("body", req.body)
    // console.log("params", req.params)
    database.table('quotation_detail')
        .filter({ id: req.body.quotationDetail_id })
        .update({
            quantity: req.body.quantity,
            discount: req.body.discount
        })
    database.table('quotation')
        .filter({ id: req.body.quotation_id })
        .update({
            total: req.body.Total,
        })
        .then((tempD) => {
            console.log("Updated product Quantity and discount in quotation_detail and total in quotation", tempD)
            res.json({
                message: `Product from quotation Details and total in quotation updated successfully`,
                success: true,
            })
        })
        .catch(err => res.json(err));
});


//update single product line from order detail table 1

router.post('/updateProductInOrderDetailTable', (req, res) => {

    console.log("body", req.body)
    // console.log("params", req.params)
    database.table('order_detail')
        .filter({ id: req.body.order_id })
        .update({
            quantity: req.body.quantity,
            discount: req.body.discount,
            line_discount_price: req.body.lineDiscountPrice,
            line_discount_price_wo_tax: req.body.lineDiscountPriceExclTax,
            igst: req.body.igst ,
            cgst: req.body.cgst ,
            sgst: req.body.sgst ,
            line_total: req.body.line_total ,

        })
    database.table('product_order')
        .filter({ id: req.body.order_id })
        .update({
            total: req.body.Total,
            sub_total: req.body.sub_total,
            total_cgst: req.body.total_cgst,
            total_sgst: req.body.total_sgst,
            total_igst: req.body.total_igst,
        })
        .then((tempD) => {
            console.log("Updated product Quantity and discount in quotation_detail and total in quotation", tempD)
            res.json({
                message: `Product from quotation Details and total in quotation updated successfully`,
                success: true,
            })
        })
        .catch(err => res.json(err));
});


//update single product line from backorder detail table 1

router.post('/updateProdFrmBOT', (req, res) => {

    console.log("body", req.body)
    // console.log("params", req.params)
    database.table('backorder_detail')
        .filter({ id: req.body.quotationDetail_id })
        .update({
            quantity: req.body.quantity,
            discount: req.body.discount,
            line_discount_price: req.body.priceAfterDiscount,
            line_total: req.body.lineTotal,
            balance_quantity: req.body.balanceQuantity,
        })
    database.table('backorder')
        .filter({ id: req.body.quotation_id })
        .update({
            total: req.body.Total,
            total_quantity: req.body.totalQuantity,
            balance_quantity: req.body.totalQuantity
        })
        .then((tempD) => {
            console.log("Updated product Quantity and discount in backorder_detail and total in backorder", tempD)
            res.json({
                message: `Product from backorder Details and total in backorder updated successfully`,
                success: true,
            })
        })
        .catch(err => res.json(err));
});


//save single product line from template detail table// TDT template detail table

router.post('/saveProdFrmTDT', (req, res) => {
    console.log("body", req.body)
    database.table('quotetemplate_details')
        //.filter({ id :  req.body.TemplateDetail_id  })
        .insert({
            template_id: req.body.Template_id,
            product_id: req.body.Product_id,
            quantity: req.body.Quantity,
            price: req.body.Price
        })
    database.table('quotetemplate')
        .filter({ template_id: req.body.Template_id })
        .update({
            total: req.body.Total,
        })
        .then((tempD) => {
            console.log("Saved product in Template_details and total in template", tempD)
            res.json({
                message: `Saved Product in Template Details and updated total in template successfully`,
                success: true,
            })
        })
        .catch(err => res.json(err));
});

//save single product line from quotation detail table// QDT quotation detail table

router.post('/saveProdFrmQDT', (req, res) => {
    console.log("body", req.body)
    database.table('pos_development_detail')
        //.filter({ id :  req.body.TemplateDetail_id  })
        .insert({
            quotation_id: req.body.Quotation_id,
            product_id: req.body.Product_id,
            quantity: req.body.Quantity,
            price: req.body.Price,
            tax_id: req.body.product.tax_id,
            tax_rate: req.body.product.tax,
            price_after_tax: req.body.product.priceInclTax,
            discount: req.body.product.discount,
            line_discount_price: req.body.product.lineDiscountPrice,
            igst: req.body.product.igst,
            cgst: req.body.product.cgst,
            sgst: req.body.product.sgst,
            line_total: req.body.product.linetotal
        })
    // req.body.taxSummary.forEach(t => {
    // database.table('tax_summary')
    // .filter({ quotation_id :  req.body.Quotation_id, tax_id : req.body.taxSummary.uniqId  })
    // .update({
    //         subtotal: t.subTotal,
    //         cgst: t.cgst,
    //         sgst: t.sgst,
    //         igst: t.igst,
    // })
    // })

    database.table('pos_development')
        .filter({ id: req.body.Quotation_id })
        .update({
            total: req.body.Total,
            sub_total: req.body.sub_total,
            total_cgst: req.body.total_cgst,
            total_sgst: req.body.total_sgst,
            total_igst: req.body.total_igst,
        })
        .then((quoteD) => {
            console.log("Saved product in Quotation_details and total in Quotation", quoteD)
            res.json({
                message: `Saved Product in Quotation Details and updated total in Quotation successfully`,
                success: true,
            })
        })
        .catch(err => res.json(err));
});


//save single product line from quotation detail table// QDT quotation detail table   1

router.post('/saveProdFrmQDT1', (req, res) => {
    console.log("body", req.body)
    database.table('quotation_detail')
        //.filter({ id :  req.body.TemplateDetail_id  })
        .insert({
            quotation_id: req.body.Quotation_id,
            product_id: req.body.Product_id,
            quantity: req.body.Quantity,
            price: req.body.Price,
            tax_id: req.body.product.tax_id,
            tax_rate: req.body.product.tax,
            price_after_tax: req.body.product.priceInclTax,
            discount: req.body.product.discount,
            line_discount_price: req.body.product.lineDiscountPrice,
            tax: req.body.product.igst,
            line_total: req.body.product.linetotal
        })
    // req.body.taxSummary.forEach(t => {
    // database.table('tax_summary')
    // .filter({ quotation_id :  req.body.Quotation_id, tax_id : req.body.taxSummary.uniqId  })
    // .update({
    //         subtotal: t.subTotal,
    //         cgst: t.cgst,
    //         sgst: t.sgst,
    //         igst: t.igst,
    // })
    // })

    database.table('quotation')
        .filter({ id: req.body.Quotation_id })
        .update({
            total: req.body.Total,
        })
        .then((quoteD) => {
            console.log("Saved product in Quotation_details and total in Quotation", quoteD)
            res.json({
                message: `Saved Product in Quotation Details and updated total in Quotation successfully`,
                success: true,
            })
        })
        .catch(err => res.json(err));
});


//save single product line from backorder detail table// QDT backorder detail table   1

router.post('/saveProdFrmBOT', (req, res) => {
    console.log("body", req.body)
    database.table('backorder_detail')
        //.filter({ id :  req.body.TemplateDetail_id  })
        .insert({
            backorder_id: req.body.Quotation_id,
            product_id: req.body.Product_id,
            quantity: req.body.Quantity,
            price: req.body.Price,
            tax_id: req.body.product.tax_id,
            tax_rate: req.body.product.tax,
            price_after_tax: req.body.product.priceInclTax,
            discount: req.body.product.discount,
            line_discount_price: req.body.product.lineDiscountPrice,
            tax: req.body.product.igst,
            line_total: req.body.product.linetotal
        })
    // req.body.taxSummary.forEach(t => {
    // database.table('tax_summary')
    // .filter({ quotation_id :  req.body.Quotation_id, tax_id : req.body.taxSummary.uniqId  })
    // .update({
    //         subtotal: t.subTotal,
    //         cgst: t.cgst,
    //         sgst: t.sgst,
    //         igst: t.igst,
    // })
    // })

    database.table('backorder')
        .filter({ id: req.body.backorder_id })
        .update({
            total: req.body.Total,
        })
        .then((quoteD) => {
            console.log("Saved product in backorder_details and total in backorder", quoteD)
            res.json({
                message: `Saved Product in backorder Details and updated total in backorder successfully`,
                success: true,
            })
        })
        .catch(err => res.json(err));
});



// get all quotation
router.get('/quotation/getAllQuote', (req, res) => {
    database.table('pos_development as q')
        .join([
            {
                table: "customer as c",
                on: `q.customer_id = c.customer_id`
            },
            {
                table: "customer_address as ca",
                on: `q.shipping_id = ca.id`
            }
        ])
        .withFields([
            'q.id',
            'q.total',
            'q.updated',
            'c.first_name',
            'c.second_name',
            'ca.branch',
        ])
        //.filter({'q.id':Id})
        .sort({ id: -1 })
        .getAll()
        .then(qte => {
            if (qte) {
                res.status(200).json(qte);
                console.log(qte)
            } else {
                res.json({ message: `No quotation found` });
            }
        }).catch(err => res.json(err));
})

// get all quotation from quotation table
router.get('/quotation/getAllQuotation', (req, res) => {
    database.table('quotation as q')
        .join([
            {
                table: "customer as c",
                on: `q.customer_id = c.customer_id`
            },
            {
                table: "customer_address as ca",
                on: `q.shipping_id = ca.id`
            }
        ])
        .withFields([
            'q.id',
            'q.total',
            'q.updated',
            'c.first_name',
            'c.second_name',
            'ca.branch',
        ])
        //.filter({'q.id':Id})
        .sort({ id: -1 })
        .getAll()
        .then(qte => {
            if (qte) {
                res.status(200).json(qte);
                console.log(qte)
            } else {
                res.json({ message: `No quotation found` });
            }
        }).catch(err => res.json(err));
})

// get all quotation 1
router.get('/quotation/getAllQuote1', (req, res) => {
    database.table('quotation as q')
        .join([
            {
                table: "customer as c",
                on: `q.customer_id = c.customer_id`
            },
            {
                table: "customer_address as ca",
                on: `q.shipping_id = ca.id`
            }
        ])
        .withFields([
            'q.id',
            'q.total',
            'q.updated',
            'c.first_name',
            'c.second_name',
            'ca.branch',
        ])
        //.filter({'q.id':Id})
        .sort({ id: -1 })
        .getAll()
        .then(qte => {
            if (qte) {
                res.status(200).json(qte);
                console.log(qte)
            } else {
                res.json({ message: `No quotation found` });
            }
        }).catch(err => res.json(err));
})

// get all quotation 1
router.get('/allBackorders/all', (req, res) => {
    database.table('backorder as q')
        .join([
            {
                table: "customer as c",
                on: `q.customer_id = c.customer_id`
            },
            {
                table: "customer_address as ca",
                on: `q.shipping_id = ca.id`
            }
        ])
        .withFields([
            'q.id',
            'q.total',
            'q.updated',
            'c.first_name',
            'c.second_name',
            'ca.branch',
        ])
        //.filter({'q.id':Id})
        .sort({ id: -1 })
        .getAll()
        .then(qte => {
            if (qte) {
                res.status(200).json(qte);
                console.log(qte)
            } else {
                res.json({ message: `No back order found` });
            }
        }).catch(err => res.json(err));
})


//get single quotation
router.get('/singleQuotation/:Id', (req, res) => {
    let Id = req.params.Id;
    database.table('pos_development_detail as qd')
        .join([
            {
                table: "pos_development as q",
                on: `q.id = qd.quotation_id`
            },
            {
                table: "products as p",
                on: `p.id = qd.product_id`
            }
        ])
        .withFields(['qd.quotation_id',
            'qd.id',
            'qd.quantity',
            'qd.price',
            'qd.product_id',
            'qd.tax_rate',
            'qd.discount',
            'qd.line_total',
            'qd.price_after_tax',
            'qd.igst',
            'qd.sgst',
            'qd.cgst',
            'qd.line_discount_price',
            'q.customer_id',
            'q.updated',
            'p.title',
            'qd.price'
        ])
        .filter({ 'qd.quotation_id': Id })
        .getAll()
        .then(cour => {
            if (cour) {
                res.status(200).json(cour);
                console.log(cour)
            } else {
                res.json({ message: `No Quotation found with id ${Id}` });
            }
        }).catch(err => res.json(err));

});

//get single quotation 1
router.get('/singleQuotation1/:Id', (req, res) => {
    let Id = req.params.Id;
    database.table('quotation_detail as qd')
        .join([
            {
                table: "quotation as q",
                on: `q.id = qd.quotation_id`
            },
            {
                table: "products as p",
                on: `p.id = qd.product_id`
            }
        ])
        .withFields(['qd.quotation_id',
            'qd.id',
            'qd.quantity',
            'qd.price',
            'qd.product_id',
            'qd.tax_rate',
            'qd.discount',
            'qd.line_total',
            'qd.igst',
            'qd.cgst',
            'qd.sgst',
            'qd.price_after_tax',
            'qd.tax',
            'qd.line_discount_price',
            'qd.line_discount_price_et',
            'q.customer_id',
            'q.updated',
            'q.total_wo_tax',
            'p.title',
            'qd.price'
        ])
        .filter({ 'qd.quotation_id': Id })
        .getAll()
        .then(cour => {
            if (cour) {
                res.status(200).json(cour);
                console.log(cour)
            } else {
                res.json({ message: `No Quotation found with id ${Id}` });
            }
        }).catch(err => res.json(err));

});


//get single backorder 1
router.get('/singleBackorder/:Id', (req, res) => {
    let Id = req.params.Id;
    database.table('backorder_detail as qd')
        .join([
            {
                table: "backorder as q",
                on: `q.id = qd.backorder_id`
            },
            {
                table: "products as p",
                on: `p.id = qd.product_id`
            }
        ])
        .withFields(['qd.backorder_id',
            'qd.id',
            'qd.quantity',
            'qd.price',
            'qd.product_id',
            'qd.tax_rate',
            'qd.discount',
            'qd.line_total',
            'qd.price_after_tax',
            'qd.tax',
            'qd.line_discount_price',
            'q.customer_id',
            'q.updated',
            'p.title',
            'qd.price',
            'qd.shipped_quantity'
        ])
        .filter({ 'qd.backorder_id': Id })
        .getAll()
        .then(cour => {
            if (cour) {
                res.status(200).json(cour);
                console.log(cour)
            } else {
                res.json({ message: `No backorder found with id ${Id}` });
            }
        }).catch(err => res.json(err));

});

//get single backorder 1
router.get('/singleOrderToPack/:Id', (req, res) => {
    let Id = req.params.Id;
    database.table('backorder_detail as qd')
        .join([
            {
                table: "backorder as q",
                on: `q.id = qd.backorder_id`
            },
            {
                table: "products as p",
                on: `p.id = qd.product_id`
            }
        ])
        .withFields(['qd.backorder_id',
            'qd.id',
            'qd.quantity',
            'qd.price',
            'qd.product_id',
            'qd.tax_rate',
            'qd.discount',
            'qd.line_total',
            'qd.price_after_tax',
            'qd.tax',
            'qd.line_discount_price',
            'q.customer_id',
            'q.updated',
            'p.title',
            'p.quantity as Quantity',
            'qd.price',
            'qd.shipped_quantity',
            'qd.balance_quantity'
        ])
        .filter({ 'qd.backorder_id': Id ,  'qd.balance_quantity': { $ne: 0 }})
        //.filter({ balance_quantity: { $ne: 0 } , shipped: { $ne: 0 }})
        .getAll()
        .then(cour => {
            if (cour) {
                res.status(200).json(cour);
                console.log(cour)
            } else {
                res.json({ message: `No backorder found with id ${Id}` });
            }
        }).catch(err => res.json(err));

});


// add discount group

router.post('/newDiscountGroup', async (req, res) => {
    // let userId = req.body.userId;
    // let data = JSON.parse(req.body);
    console.log('ALL', req.body);
    let { name, value } = req.body;
    //console.log('Products', products);
    database.table('discount_group')
        .insert({
            discount_name: name,
            discount_value: value,
        }).then((newDiscountGroupId) => {
            console.log('new discount group', newDiscountGroupId.insertId)
            res.json({
                message: `discount group successfully placed with discount group id ${newDiscountGroupId.insertId}`,
                success: true,
                discount_group_id: newDiscountGroupId.insertId,
            })
        }).catch((error) => {
            console.error("The Promise is rejected!", error);
        })
});




// add discount group

router.post('/newTax', async (req, res) => {
    // let userId = req.body.userId;
    // let data = JSON.parse(req.body);
    console.log('ALL', req.body);
    let { name, value } = req.body;
    //console.log('Products', products);
    database.table('tax')
        .insert({
            tax_name: name,
            tax_rate: value,
        }).then((newTaxId) => {
            console.log('new discount group', newTaxId.insertId)
            res.json({
                message: `new tax successfully added with id ${newTaxId.insertId}`,
                success: true,
                discount_group_id: newTaxId.insertId,
            })
        }).catch((error) => {
            console.error("The Promise is rejected!", error);
        })
});


// get all discount groups

router.get('/quotation/getAllDiscountGroup', (req, res) => {
    database.table('discount_group as q')

        .withFields([
            'q.id',
            'q.discount_name',
            'q.discount_value',

        ])
        //.filter({'q.id':Id})
        .getAll()
        .then(qte => {
            if (qte) {
                res.status(200).json(qte);
                console.log(qte)
            } else {
                res.json({ message: `No Discount group found` });
            }
        }).catch(err => res.json(err));

})


// get discount group of customer

router.post('/quotation/getAllDiscountGroup', (req, res) => {
    let { id } = req.body;

    database.table('discount_group as q')

        .withFields([
            'q.id',
            'q.discount_name',
            'q.discount_value'
        ])
        .filter({ 'q.id': id })
        .get()
        .then(qte => {
            if (qte) {
                res.status(200).json(qte);
                console.log(qte)
            } else {
                res.json({ message: `No Discount group found` });
            }
        }).catch(err => res.json(err));

})

//// edit quotation

// add new quotation
// router.post('/newQuotation', async (req, res) => {
// let userId = req.body.userId;
// let data = JSON.parse(req.body);
// console.log('ALL', req.body);
// let {custId, billingId, shippingId, total, products} = req.body;
// //console.log('Products', products);
//     database.table('quotation')
//         .insert({
//             customer_id: custId,
//             billing_id: billingId,
//             shipping_id: shippingId,
//             total: total
//         }).then((newQuotationId) => {
//             console.log('new Template',newQuotationId.insertId)
//     if (newQuotationId.insertId > 0) {
//         products.forEach(p => {
//             console.log('console p',p)
//            // let inQuote = parseInt(p.inquote);

//             // Insert order details w.r.t the newly created order Id
//             database.table('quotation_detail')
//                 .insert({
//                     quotation_id: newQuotationId.insertId,
//                     product_id: p.id,
//                     quantity: p.inquote,
//                     price: p.price
//                 }).catch(err => console.log(err));
//         });
//     } else {
//         res.json({message: 'New Quotation failed while adding Quotation details', success: false});
//     };
//     res.json({
//         message: `Quotation successfully placed with Quotation id ${newQuotationId.insertId}`,
//         success: true,
//         quotation_id: newQuotationId.insertId,
//         products: products
//     })
// }).catch((error) => {
//     console.error("The Promise is rejected!", error);
//   })
// });


// add new quotation
router.post('/newBackorder', async (req, res) => {
    let userId = req.body.userId;
    //let data = JSON.parse(req.body);
    console.log('ALL', req.body);
    let { cust_id, billingId, shippingId, total, subTotal, totalCgst, totalSgst, totalIgst, product, taxSummary } = req.body;
    //console.log('Products', products);
    database.table('pos_development')
        .insert({
            customer_id: cust_id,
            billing_id: billingId,
            shipping_id: shippingId,
            total: total,
            sub_total: subTotal,
            total_cgst: totalCgst,
            total_sgst: totalSgst,
            total_igst: totalIgst,
        }).then((newQuotationId) => {
            console.log('new Template', newQuotationId.insertId)
            taxSummary.forEach(t => {
                console.log('console t', t)
                database.table('tax_summary')
                    .insert({
                        product_order_id: newQuotationId.insertId,
                        tax_id: t.uniqId,
                        subtotal: t.subTotal,
                        cgst: t.cgst,
                        sgst: t.sgst,
                        igst: t.igst,
                    })
            })

            if (newQuotationId.insertId > 0) {
                product.forEach(p => {
                    console.log('console p', p)
                    // let inQuote = parseInt(p.inquote);

                    // Insert order details w.r.t the newly created order Id
                    database.table('pos_development_detail')
                        .insert({
                            quotation_id: newQuotationId.insertId,
                            product_id: p.productId,
                            quantity: p.numInQuote,
                            price: p.price,
                            tax_rate: p.tax,
                            tax_id: p.tax_id,
                            discount: p.discount,
                            cgst: p.cgst,
                            sgst: p.sgst,
                            igst: p.igst,
                            line_total: p.linetotal,
                            price_after_tax: p.priceInclTax,
                            line_discount_price: p.lineDiscountPrice
                        }).catch(err => console.log(err));
                });
            } else {
                res.json({ message: 'New Quotation failed while adding Quotation details', success: false });
            };

            res.json({
                message: `Quotation successfully placed with Quotation id ${newQuotationId.insertId}`,
                success: true,
                quotation_id: newQuotationId.insertId,
                product: product
            })
        }).catch((error) => {
            console.error("The Promise is rejected!", error);
        })
});

// add new quotation actual
router.post('/QuotationNew', async (req, res) => {
    let userId = req.body.userId;
    //let data = JSON.parse(req.body);
    console.log('ALL', req.body);
    let { cust_id, billingId, shippingId, total, subTotal, product, totalIgst, totalCgst, totalSgst, discount, totalWOtax } = req.body;
    //console.log('Products', products);
    database.table('quotation')
        .insert({
            customer_id: cust_id,
            billing_id: billingId,
            shipping_id: shippingId,
            total: total,
            sub_total: subTotal,
            total_igst: totalIgst,
            total_cgst: totalCgst,
            total_sgst: totalSgst,
            discount: discount,
            total_wo_tax: totalWOtax
        }).then((newQuotationId) => {
            console.log('new Template', newQuotationId.insertId)
            if (newQuotationId.insertId > 0) {
                product.forEach(p => {
                    console.log('console p', p)
                    // let inQuote = parseInt(p.inquote);

                    // Insert order details w.r.t the newly created order Id
                    database.table('quotation_detail')
                        .insert({
                            quotation_id: newQuotationId.insertId,
                            product_id: p.productId,
                            quantity: p.numInQuote,
                            price: p.price,
                            tax_rate: p.tax,
                            tax_id: p.tax_id,
                            discount: p.discount,
                            tax: p.igst,
                            igst: p.igst,
                            cgst: p.cgst,
                            sgst: p.sgst,
                            line_total: p.linetotal,
                            price_after_tax: p.priceInclTax,
                            line_discount_price: p.lineDiscountPrice,
                            line_discount_price_et: p.lineDiscountPriceExclTax
                        }).catch(err => console.log(err));
                });
            } else {
                res.json({ message: 'New Quotation failed while adding Quotation details', success: false });
            };

            res.json({
                message: `Quotation successfully placed with Quotation id ${newQuotationId.insertId}`,
                success: true,
                quotation_id: newQuotationId.insertId,
                product: product
            })
        }).catch((error) => {
            console.error("The Promise is rejected!", error);
        })
});

// add new quotation actual
router.post('/BackOrderNew', async (req, res) => {
    let userId = req.body.userId;
    //let data = JSON.parse(req.body);
    console.log('ALL', req.body);
     let { cust_id, billingId, shippingId, total, subTotal, totalTax, product, totalQuantity } = req.body;
    //console.log('Products', products);
    database.table('backorder')
        .insert({
            customer_id: cust_id,
            billing_id: billingId,
            shipping_id: shippingId,
            total: total,
            total_quantity: totalQuantity,
            balance_quantity: totalQuantity
        }).then((backorderID) => {
            console.log('new backorder', backorderID.insertId)
            if (backorderID.insertId > 0) {
                product.forEach(p => {
                    console.log('console p', p)
                    // let inQuote = parseInt(p.inquote);

                    // Insert order details w.r.t the newly created order Id
                    database.table('backorder_detail')
                        .insert({
                            backorder_id: backorderID.insertId,
                            product_id: p.productId,
                            quantity: p.numInQuote,
                            price: p.price,
                            tax_rate: p.tax,
                            tax_id: p.tax_id,
                            discount: p.discount,
                            tax: p.igst,
                            line_total: p.linetotal,
                            price_after_tax: p.priceInclTax,
                            line_discount_price: p.lineDiscountPrice,
                            balance_quantity: p.numInQuote
                        }).catch(err => console.log(err));
                });
            } else {
                res.json({ message: 'New Quotation failed while adding Quotation details', success: false });
            };

            res.json({
                message: `Quotation successfully placed with Quotation id ${backorderID.insertId}`,
                success: true,
                quotation_id: backorderID.insertId,
                product: product
            })
        }).catch((error) => {
            console.error("The Promise is rejected!", error);
        })
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// update shipping address

router.post('/updateShippingAdd', async (req, res) => {
    console.log('ALL', req.body);
    console.log('Q id', req.body.data.quote_id);
    console.log('S id', req.body.data.shippingId);
    database.table('pos_development')
        .filter({ id: req.body.data.quote_id })
        .update({
            shipping_id: req.body.data.shippingId,
        }).then((quoteD) => {
            console.log("shipping id updated", quoteD)
            res.json({
                message: `shipping id updated`,
                success: true,
            })
        })
        .catch(err => res.json(err));
})

// update shipping address 1

router.post('/updateShippingAdd1', async (req, res) => {
    console.log('ALL', req.body);
    console.log('Q id', req.body.data.quote_id);
    console.log('S id', req.body.data.shippingId);
    database.table('quotation')
        .filter({ id: req.body.data.quote_id })
        .update({
            shipping_id: req.body.data.shippingId,
        }).then((quoteD) => {
            console.log("shipping id updated", quoteD)
            res.json({
                message: `shipping id updated`,
                success: true,
            })
        })
        .catch(err => res.json(err));
})


// update shipping address 1 backorder

router.post('/updateBackorderShippingAdd1', async (req, res) => {
    console.log('ALL', req.body);
    console.log('Q id', req.body.data.quote_id);
    console.log('S id', req.body.data.shippingId);
    database.table('backorder')
        .filter({ id: req.body.data.quote_id })
        .update({
            shipping_id: req.body.data.shippingId,
        }).then((quoteD) => {
            console.log("shipping id updated", quoteD)
            res.json({
                message: `shipping id updated`,
                success: true,
            })
        })
        .catch(err => res.json(err));
})


// update billing address

router.post('/updateBillingAdd', async (req, res) => {
    console.log('ALL', req.body);
    database.table('pos_development')
        .filter({ id: req.body.data.quote_id })
        .update({
            billing_id: req.body.data.billingId,
        }).then((quoteD) => {
            console.log("billing id updated", quoteD)
            res.json({
                message: `billing id updated`,
                success: true,
            })
        })
        .catch(err => res.json(err));
})

// update billing address 1

router.post('/updateBillingAdd1', async (req, res) => {
    console.log('ALL', req.body);
    console.log('bill id', req.body.data.billingId);

    database.table('quotation')
        .filter({ id: req.body.data.quote_id })
        .update({
            billing_id: req.body.data.billingId,
        })
        .then((quoteD) => {
            console.log("billing id updated", quoteD)
            res.json({
                message: `billing id updated`,
                success: true,
            })
        })
        .catch(err => res.json(err));
})



// get all orders to pack

router.get('/allOrdersToPack', (req, res) => {
    database.table('backorder as q')
        .withFields(['q.id',
        ])
        .filter({ balance_quantity: { $ne: 0 } })
        .getAll()
        .then(odrstopk => {
            if (odrstopk) {
                res.status(200).json(odrstopk);
                console.log(odrstopk)
            } else {
                res.json({ message: `no items to ship` });
            }
        }).catch(err => res.json(err));
});



// get all orders to pack  - new
router.get('/OrdersToPack2/all', (req, res) => {
    database.table('backorder as q')
        .join([
            {
                table: "customer as c",
                on: `q.customer_id = c.customer_id`
            },
            {
                table: "customer_address as ca",
                on: `q.shipping_id = ca.id`
            }
        ])
        .withFields([
            'q.id',
            'q.total',
            'q.total_quantity',
            'q.balance_quantity',
            'q.updated',
            'c.first_name',
            'c.second_name',
            'ca.branch',
        ])
        //.filter({'q.id':Id})
        .filter({ balance_quantity: { $ne: 0 } , shipped: 0} )
        .sort({ id: -1 })
        .getAll()
        .then(qte => {
            if (qte) {
                res.status(200).json(qte);
                console.log(qte)
            } else {
                res.json({ message: `No back order found` });
            }
        }).catch(err => res.json(err));
})


// get all orders to pack --- short shipped
router.get('/OrdersToPackShortShipped/all', (req, res) => {
    database.table('backorder as q')
        .join([
            {
                table: "customer as c",
                on: `q.customer_id = c.customer_id`
            },
            {
                table: "customer_address as ca",
                on: `q.shipping_id = ca.id`
            }
        ])
        .withFields([
            'q.id',
            'q.total',
            'q.total_quantity',
            'q.balance_quantity',
            'q.updated',
            'c.first_name',
            'c.second_name',
            'ca.branch',
        ])
        //.filter({'q.id':Id})
        .filter({ balance_quantity: { $ne: 0 } , shipped: { $ne: 0 }})
        .sort({ id: -1 })
        .getAll()
        .then(qte => {
            if (qte) {
                res.status(200).json(qte);
                console.log(qte)
            } else {
                res.json({ message: `No back order found` });
            }
        }).catch(err => res.json(err));
})



// create delivery chalan

router.post('/deliveryChalan', async (req, res) => {
    console.log('ALL', req.body);

    let { customer_id, backOrderId, billId, shipId, totalShipQuantity, total_price, DC, balanceQuantity } = req.body;
    //console.log('Products', products);


    DC.forEach(p => {
        console.log('console p', p)
        // let inQuote = parseInt(p.inquote);
        // Insert order details w.r.t the newly created order Id
        database.table('products')
            .filter({ 'id': p.product_id })
            .update({
                quantity: p.Q,
            }).catch(err => console.log(err));

            database.table('backorder_detail')
            .filter({ 'id': p.id })
            .update({
                shipped_quantity: p.SQ,
                balance_quantity: p.BQ
            }).catch(err => console.log(err));
    });

    database.table('backorder')
    .filter({ 'id': backOrderId })
    .update({
        balance_quantity: balanceQuantity,
        shipped: 1
    })
    database.table('delivery_challan')
        .insert({
            customer_id: customer_id,
            backorder_id: backOrderId,
            shipping_id: shipId,
            billing_id: billId,
            total_quantity: totalShipQuantity,
            total_price: total_price,
        }).then((newTemplateId) => {
            console.log('new Template', newTemplateId.insertId)
            if (newTemplateId.insertId > 0) {
                DC.forEach(p => {
                    console.log('console p', p)
                    // let inQuote = parseInt(p.inquote);
                    // Insert order details w.r.t the newly created order Id
                    database.table('delivery_challan_detail')
                        .insert({
                            delivery_challan_id: newTemplateId.insertId,
                            product_id: p.product_id,
                            quantity: p.SQ,
                            price: p.price_after_tax,
                            price_after_discount: p.line_discount_price,
                            line_total: p.line_total
                        }).catch(err => console.log(err));
                        database.table('backorder_detail')
                        .filter({ 'id': p.id })
                        .update({
                            shipped_quantity: p.SQ,
                            balance_quantity: p.BQ
                        }).catch(err => console.log(err));
                });
            } else {
                res.json({ message: 'New Template failed while adding Template details', success: false });
            };
            res.json({
                message: `Template successfully placed with Template id ${newTemplateId.insertId}`,
                success: true,
                order_id: newTemplateId.insertId,
                products: DC
            })
        }).catch((error) => {
            console.error("The Promise is rejected!", error);
        })

        // database.table('product_order')
        // .insert({
        //     customer_id: 1,
        //     shipping_id: 1,
        //     billing_id: 1,

        // })

})



// update invoice number in backorder

router.post('/cashInvoice', async (req, res) => {
    console.log('ALL', req.body);

    let { data, DATA, custId, shipId, billId, totalI, totalC, totalS, subTotal, prodData, TorC } = req.body;

    //console.log('Products', products);


    database.table('product_order')
    .insert({
        customer_id: custId,
        shipping_id: shipId,
        billing_id: billId,
        round_total: DATA.total,
        total: DATA.total,
        sub_total: subTotal,
        total_igst: totalI,
        total_sgst: totalS,
        total_cgst: totalC,
    })
    .then((newOrderId) => {

        if(TorC == 2){
            database.table('tax_invoice')
            .insert({
                order_id: newOrderId.insertId,
                customer_id: custId,
                shipping_id: shipId,
                billing_id: billId,
                round_total: DATA.total,
                total: DATA.total,
                sub_total: subTotal,
                total_igst: totalI,
                total_sgst: totalS,
                total_cgst: totalC,
            })
            .then((newTaxInvOrderId) => {

                data.forEach(q => {
                    console.log('q', q)
                    console.log('q1', newTaxInvOrderId.insertId)

                database.table('delivery_challan_detail')
                .filter({ 'id': q })
                .update({
                    invoice_id: newTaxInvOrderId.insertId
                })

            })

                prodData.forEach(p => {
                    //console.log('console p', p)
                    //console.log('new id ', newTaxInvOrderId)
                    // let inQuote = parseInt(p.inquote);
                    // Insert order details w.r.t the newly created order Id
                    database.table('tax_invoice_detail')
                    .insert({
                        tax_invoice_id: newTaxInvOrderId.insertId,
                        product_id: p.productId,
                        quantity: p.numInQuote,
                        price: p.price,
                        tax_id: p.tax_id,
                        tax_rate: p.tax,
                        price_after_tax: p.priceInclTax,
                        discount: p.discount,
                        line_discount_price: p.lineDiscountPrice,
                        igst: p.igst,
                        sgst: p.sgst,
                        cgst: p.cgst,
                        line_total: p.linetotal
                    })
                    .then(qte => {
                        if (qte) {
                            res.status(200).json(qte);
                            console.log(qte)
                        } else {
                            res.json({ message: `Some issue in creating invoice`,
                        TnewId: qte.insertId });
                        }
                    })
                    .catch((error) => {
                        console.error("The Promise is rejected!", error);
                    })
                });
            })
        }else{
                database.table('cash_invoice')
                .insert({
                    order_id: newOrderId.insertId,
                    customer_id: custId,
                    shipping_id: shipId,
                    billing_id: billId,
                    round_total: DATA.total,
                    total: DATA.total,
                    sub_total: subTotal,
                    total_igst: totalI,
                    total_sgst: totalS,
                    total_cgst: totalC,
                })
                .then((newCashInvOrderId) => {


                    data.forEach(q => {
                        console.log('q', q)
                        console.log('q1', newCashInvOrderId.insertId)

                    database.table('delivery_challan_detail')
                    .filter({ 'id': q })
                    .update({
                        invoice_id: newCashInvOrderId.insertId
                    })

                })
                    prodData.forEach(r => {
                        //console.log('console p', p)
                        //console.log('new id ', newTaxInvOrderId)
                        // let inQuote = parseInt(p.inquote);
                        // Insert order details w.r.t the newly created order Id
                        database.table('cash_invoice_detail')
                        .insert({
                            id: newCashInvOrderId.insertId,
                            product_id: r.productId,
                            quantity: r.numInQuote,
                            price: r.price,
                            tax_id: r.tax_id,
                            tax_rate: r.tax,
                            price_after_tax: r.priceInclTax,
                            discount: r.discount,
                            line_discount_price: r.lineDiscountPrice,
                            igst: r.igst,
                            sgst: r.sgst,
                            cgst: r.cgst,
                            line_total: r.linetotal
                        })
                        .then(qte => {
                            if (qte) {
                                res.status(200).json({qte, CnewId: qte.insertId});
                                console.log(qte)
                            } else {
                                res.json({ message: `Some issue in creating invoice` });
                            }
                        })
                        .catch((error) => {
                            console.error("The Promise is rejected!", error);
                        })
                    });
                })


        }

        prodData.forEach(p => {
            //console.log('console p', p)
            //console.log('new id ', newOrderId)
            // let inQuote = parseInt(p.inquote);
            // Insert order details w.r.t the newly created order Id
            database.table('order_detail')
            .insert({
                product_order_id: newOrderId.insertId,
                product_id: p.productId,
                quantity: p.numInQuote,
                price: p.price,
                tax_id: p.tax_id,
                tax_rate: p.tax,
                price_after_tax: p.priceInclTax,
                discount: p.discount,
                line_discount_price: p.lineDiscountPrice,
                igst: p.igst,
                sgst: p.sgst,
                cgst: p.cgst,
                line_total: p.linetotal
            })
            .catch((error) => {
                console.error("The Promise is rejected!", error);
            })
        });
    })
});



// get all orders list
router.get('/allOrders/all', function (req, res) {  // Sending Page Query Parameter is mandatory http://localhost:3636/api/course?page=1
    database.table('product_order as q')
             .join([
            {
                table: "customer as c",
                on: `c.customer_id = q.customer_id`
            },
            {
                table: "customer_address as ca",
                on: `ca.id = q.shipping_id`
            },
          //  {
            //     table: "cash_invoice as ci",
            //     on: `ci.order_id = q.id`
            // },
            // {
            //     table: "tax_invoice as ti",
            //     on: `ti.order_id = q.id`
            // }
         ])
        .withFields([
            'q.id',
            'q.customer_id',
            'c.first_name',
            'c.second_name',
            'q.round_total',
            'q.created',
            'ca.branch',
            'ca.company_name',
            'ca.city',
            // 'ti.id as tax_invoice_id',
            // 'ci.id as cash_invoice_id',
        ])
        //.slice(startValue, endValue)
        //.sort({ template_id: .1 })
        .getAll()
        .then(temps => {
            if (temps.length > 0) {
                res.status(200).json({
                    count: temps.length,
                    orders: temps
                });
            } else {
                res.json({ message: "No orders found" });
            }
        })
        .catch(err => console.log(err));
});


//get single backorder 1
router.get('/singleProductorder/:Id', (req, res) => {
    let Id = req.params.Id;
    database.table('order_detail as qd')
        .join([
            {
                table: "product_order as q",
                on: `q.id = qd.product_order_id`
            },
            {
                table: "products as p",
                on: `p.id = qd.product_id`
            }
        ])
        .withFields(['qd.product_order_id',
            'qd.id',
            'qd.quantity',
            'qd.price',
            'qd.product_id',
            'qd.tax_rate',
            'qd.discount',
            'qd.line_total',
            'qd.price_after_tax',
            'qd.igst',
            'qd.cgst',
            'qd.sgst',
            'qd.line_discount_price',
            'qd.line_discount_price_wo_tax',
            'q.customer_id',
            'q.updated',
            'p.title',
            'qd.price',
        ])
        .filter({ 'qd.product_order_id': Id })
        .getAll()
        .then(cour => {
            if (cour) {
                res.status(200).json(cour);
                console.log(cour)
            } else {
                res.json({ message: `No backorder found with id ${Id}` });
            }
        }).catch(err => res.json(err));

});


//get billing address for given backorder id1

router.get('/billingAddPO/:Id', (req, res) => {
    let Id = req.params.Id;
    database.table('product_order as q')
        .join([
            {
                table: "customer_address as ca",
                on: `q.billing_id = ca.id`
            }
        ])
        .withFields([
            'ca.branch',
            'ca.id',
            'ca.salution',
            'ca.first_name',
            'ca.second_name',
            'ca.company_name',
            'ca.mobile',
            'ca.gstin',
            'ca.address1',
            'ca.address2',
            'ca.city',
            'ca.pincode',
            'ca.state_id',
            'ca.country_id'
        ])
        .filter({ 'q.id': Id })
        .get()
        .then(quote => {
            if (quote) {
                res.status(200).json(quote);
                console.log('title name desc', quote)
            } else {
                res.json({ message: `No address found with id ${Id}` });
            }
        }).catch(err => res.json(err));
});



// get single backorder(name branch total) 1

router.get('/singlepo1/:Id', (req, res) => {
    let Id = req.params.Id;
    database.table('product_order as q')
        .join([
            {
                table: "customer as c",
                on: `q.customer_id = c.customer_id`
            },
            {
                table: "customer_address as ca",
                on: `q.shipping_id = ca.id`
            }
        ])
        .withFields(['q.total',
            'q.sub_total',
            'q.total_igst',
            'q.total_sgst',
            'q.total_cgst',
            'q.created',
            'c.first_name as FirstName',
            'ca.mobile',
            'c.customer_id',
            'c.disc_group_id',
            'c.default_ship_address',
            'ca.branch',
            'ca.id',
            'ca.salution',
            'ca.first_name',
            'ca.second_name',
            'ca.company_name',
            'ca.gstin',
            'ca.address1',
            'ca.address2',
            'ca.city',
            'ca.pincode',
            'ca.state_id',
            'ca.country_id'
        ])
        .filter({ 'q.id': Id })
        .get()
        .then(quote => {
            if (quote) {
                res.status(200).json(quote);
                console.log('title name desc', quote)
            } else {
                res.json({ message: `No product order detail found with id ${Id}` });
            }
        }).catch(err => res.json(err));
});



// new pos order

router.post('/newPosOrder', async (req, res) => {
    let userId = req.body.userId;
    //let data = JSON.parse(req.body);
    console.log('ALL', req.body);
    let { cust_id, billingId, shippingId, total, subTotal, totalCgst, totalSgst, totalIgst, product, taxSummary, totalQuantity, discount, totalWOtax } = req.body;
    //console.log('Products', products);
    database.table('product_order')
        .insert({
            customer_id: cust_id,
            billing_id: billingId,
            shipping_id: shippingId,
            total: total,
            discount: discount,
            sub_total: subTotal,
            total_cgst: totalCgst,
            total_sgst: totalSgst,
            total_igst: totalIgst,
            round_total: total,
            total_quantity: totalQuantity,
            total_wo_tax: totalWOtax
        }).then((newProductOrderId) => {
            console.log('new order', newProductOrderId.insertId)
            taxSummary.forEach(t => {
                console.log('console t', t)
                database.table('tax_summary')
                    .insert({
                        product_order_id: newProductOrderId.insertId,
                        tax_id: t.uniqId,
                        subtotal: t.subTotal,
                        cgst: t.cgst,
                        sgst: t.sgst,
                        igst: t.igst,
                    })
            }) 

            if (newProductOrderId.insertId > 0) {
                product.forEach(p => {
                    console.log('console p', p)
                    // let inQuote = parseInt(p.inquote);
                    // Insert order details w.r.t the newly created order Id
                    database.table('order_detail')
                        .insert({
                            product_order_id: newProductOrderId.insertId,
                            product_id: p.productId,
                            quantity: p.numInQuote,
                            price: p.price,
                            tax_rate: p.tax,
                            tax_id: p.tax_id,
                            discount: p.discount,
                            cgst: p.cgst,
                            sgst: p.sgst,
                            igst: p.igst,
                            line_total: p.linetotal,
                            price_after_tax: p.priceInclTax,
                            line_discount_price: p.lineDiscountPrice,
                            line_discount_price_wo_tax: p.lineDiscountPriceExclTax
                        }).catch(err => console.log(err));
                });
            } else {
                res.json({ message: 'New order failed while adding order details', success: false });
            };

            res.json({
                message: `order successfully placed with order id ${newProductOrderId.insertId}`,
                success: true,
                quotation_id: newProductOrderId.insertId,
                product: product
            })
        }).catch((error) => {
            console.error("The Promise is rejected!", error);
        })
});




// leads

router.post('/leads/new', async (req, res) => {

    console.log(req.body)

    let {Salution, FirstName, SecondName, CompanyName, Branch, Mobile, WhatsApp, Landline, GSTIN, AddressLine1, AddressLine2, State, Enquiry, City, Pincode, Country, Requirement, Email, assignTo} = req.body

    database.table('leads')
    .insert({
        salution: Salution,
        first_name: FirstName,
        second_name: SecondName,
        company: CompanyName,
        branch: Branch,
        mobile: Mobile,
        whatsapp: WhatsApp,
        landline: Landline,
        gstin: GSTIN,
        address1: AddressLine1,
        address2: AddressLine2,
        state: State,
        enquiry: Enquiry,
        requirement: Requirement,
        assign_to: 1,
        email: Email,
        city: City,
        pincode: Pincode,
        country: Country
    }).then((leadId) =>{
        if (leadId) {
            res.status(200).json({LeadId: leadId, success: true});
            console.log('lead id', leadId)
        }
    }).catch((error) => {
        console.error("The Promise is rejected!", error);
    })
});


// leads

router.post('/leadCheck',[
    body('mobile').custom(value => {
        return database.table('leads').filter({ mobile : {  $in : [ value ]  } }).get().then(user => {
            if (user) {
                console.log(user);
                return Promise.reject('Mobile number already exists, choose another one.');
            }
        })
    })
], async (req, res) => {

    database.table('leads')
    .filter({ mobile : {  $in : [ req.body.mobile ]  } })
    .get().then(user => {



    const errors = validationResult(req);

    if (!errors.isEmpty()) {
                const id = user.id

        return res.json({success: true, id: id});
    } else {

        return res.json({success: false});


    // console.log(req.body)
    // let {name, mobile} = req.body
    // database.table('leads')
    // .insert({
    //     // customer: name,
    //     mobile: mobile,
    //     // address1: address1,
    //     // address2: address2,
    //     // state: state,
    //     // requirement: requirement,
    //     // assign_to: assignTo,
    //     // city: city,
    //     // pincode: pincode,
    //     // country: country
    // }).then((leadId) =>{
    //     if (leadId) {
    //         res.status(200).json({LeadId: leadId.insertId, success: false});
    //         console.log('lead id', leadId)
    //     }
    // }).catch((error) => {
    //     console.error("The Promise is rejected!", error);
    // })
}
})
});


// leads list


router.get('/getLeads/all', function (req, res) {  // Sending Page Query Parameter is mandatory http://localhost:3636/api/course?page=1
    database.table('leads as q')
    .join([{
        table: "ps_state as ca",
        on: `ca.id_state = q.state`
    },
    {
        table: "ps_country as c",
        on: `q.country = c.id_country`

    },{
        table: "ps_country_lang as cal",
        on: `cal.id_country = c.id_country`
    }
    ]).withFields([
            'q.first_name',
            'q.mobile',
            'q.address1',
            'q.address2',
            'ca.name as state',            
            'q.requirement',
            'q.assign_to',
            'q.city',
            'q.pincode',
            'q.country',
            'q.id',
            'q.branch',
            'q.enquiry'
        ])
        //.sort({ id: .1 })
        .getAll()
        .then(temps => {
            console.log('data', temps)
            if (temps.length > 0) {
                res.status(200).json(temps);
            } else {
                res.json({ message: "No leads found" });
            }
        })
        .catch(err => console.log(err));
});


// get single lead

router.get('/getLead/:Id', function (req, res) {  // Sending Page Query Parameter is mandatory http://localhost:3636/api/course?page=1
    let Id = req.params.Id;

    database.table('leads as q')
    .join([{
        table: "ps_state as ca",
        on: `ca.id_state = q.state`
    },
    {
        table: "ps_country as c",
        on: `q.country = c.id_country`

    },{
        table: "ps_country_lang as cal",
        on: `cal.id_country = c.id_country`
    }
    ]).withFields([
            'q.first_name',
            'q.second_name',
            'q.mobile',
            'q.branch',
            'q.address1',
            'q.address2',
            'ca.name as state',            
            'q.requirement',
            'q.assign_to',
            'q.city',
            'q.pincode',
            'cal.name as country',
            'q.id',
            'q.company',
            'q.gstin',
            'q.whatsapp',
            'q.email',
            'q.landline',
            'q.enquiry'

        ])
        .filter({ 'q.id': Id })
        //.sort({ id: .1 })
        .get()
        .then(lead => {
            if (lead) {
                res.status(200).json(lead);
                console.log('Lead', lead)
            } else {
                res.json({ message: `No lead found with id ${Id}` });
            }
        }).catch(err => res.json(err));
});



router.post('/laedReq/save', async (req, res) => {
    let {content } = req.body
    console.log('console products initial...', content)
    database.table('leads')
    .filter({ 'leads.id': content.id })
    .update({
        requirement: content.requirement
    }).then((leadUpdate) => {
        console.log("Leadupdated", leadUpdate)
        res.json({
            message: `Lead updated`,
            success: true,
        })
    })
})





// product bulk upload

router.post('/uploadBulkProducts/bulk', async (req, res) => {
    //        uploadBulkProducts/bulk
    let { products } = req.body;
    console.log('console products initial...', products)


    products.forEach(p => {
        console.log('console p for each place', p)
        // let inQuote = parseInt(p.inquote);

        // Insert order details w.r.t the newly created order Id
        database.table('products')
        .filter({ 'products.sku': p.sku })
        .get()
        .then(quote => {
            console.log('data', quote)

            if (quote) {
                console.log('Uploaded', p)
                console.log('Original', quote)
                if(p.title == null){ if(quote.title != null){p.title = quote.title}}
                if(p.description == null){ if(quote.description != null){p.description = quote.description}}
                if(p.quantity == null){ if(quote.quantity != null){p.quantity = quote.quantity}}
                if(p.price == null){ if(quote.price != null){p.price = quote.price}}
                if(p.tax_id == null){ if(quote.tax_id != null){p.tax_id = quote.tax_id}}
                if(p.short_desc == null){ if(quote.short_desc != null){p.short_desc = quote.short_desc}}
                if(p.cat_id == null){ if(quote.cat_id != null){p.cat_id = quote.cat_id}}
                if(p.tag_id == null){ if(quote.tag_id != null){p.tag_id = quote.tag_id}}

                console.log('updated', p)

                database.table('products')
                .filter({ 'sku': p.sku })
                .update({
                    title: p.title,
                    sku: p.sku,
                    description: p.description,
                    quantity: p.quantity,
                    price: p.price,
                    tax_id: p.tax_id,
                    short_desc: p.short_desc,
                    cat_id: p.cat_id,
                    tag_id: p.tag_id
                }).catch(err => console.log(err));
            } else {
                console.log('It do not have sku')
                database.table('products')
                .insert({
                    title: p.title,
                    sku: p.sku,
                    description: p.description,
                    quantity: p.quantity,
                    price: p.price,
                    tax_id: p.tax_id,
                    short_desc: p.short_desc,
                    cat_id: p.cat_id,
                    tag_id: p.tag_id,
                }).catch(err => console.log(err));
                // res.json({ message: `No product detail found with sku ${p.sku}` });
            }
        })

            // .insert({
            //     title: p.title,
            //     sku: p.sku,
            //     description: p.description,
            //     quantity: p.quantity,
            //     price: p.price
            // }).then((leadId) =>{
            //     if (leadId) {
            //         res.status(200).json(leadId);
            //         console.log('lead id', leadId)
            //     }
            // })
            .catch((error) => {
                console.error("The Promise is rejected!", error);
            })

    });


})



// get all tax Invoice

router.get('/taxInvoice/all', (req, res) => {
    let Id = req.params.Id;
    database.table('tax_invoice as q')
        .join([
            {
                table: "customer as c",
                on: `q.customer_id = c.customer_id`
            },
            // {
            //     table: "customer_address as ca",
            //     on: `q.shipping_id = ca.id`
            // }
        ])
        .withFields(['q.total',
            'q.id',
            'q.order_id',
            'q.customer_id',
            'q.shipping_id',
            'q.billing_id',
            'q.round_total',
            'q.total',
            'q.sub_total',
            'q.total_cgst',
            'q.total_sgst',
            'q.total_igst',
            'q.created',
            'q.updated',
            'c.first_name'
        ])
        // .filter({ 'q.id': Id })
        .getAll()
        .then(quote => {
            if (quote) {
                res.status(200).json(quote);
                console.log('title name desc', quote)
            } else {
                res.json({ message: `No invoice found` });
            }
        }).catch(err => res.json(err));
});



// get all cash Invoice

router.get('/cashInvoice/all', (req, res) => {
    let Id = req.params.Id;
    database.table('cash_invoice as q')
    .join([
        {
            table: "customer as c",
            on: `q.customer_id = c.customer_id`
        },
        // {
        //     table: "customer_address as ca",
        //     on: `q.shipping_id = ca.id`
        // }
    ])
        .withFields(['q.total',
            'q.id',
            'q.order_id',
            'q.customer_id',
            'q.shipping_id',
            'q.billing_id',
            'q.round_total',
            'q.total',
            'q.sub_total',
            'q.total_cgst',
            'q.total_sgst',
            'q.total_igst',
            'q.created',
            'q.updated',
            'c.first_name'

        ])
        // .filter({ 'q.id': Id })
        .getAll()
        .then(quote => {
            if (quote) {
                res.status(200).json(quote);
                console.log('title name desc', quote)
            } else {
                res.json({ message: `No invoice found` });
            }
        }).catch(err => res.json(err));
});


// get single tax invoice

router.get('/taxInvoice/:Id', (req, res) => {
    let Id = req.params.Id;
    database.table('tax_invoice as q')
    .join([
        {
            table: "customer as c",
            on: `q.customer_id = c.customer_id`
        },
        // {
        //     table: "customer_address as ca",
        //     on: `q.shipping_id = ca.id`
        // }
    ])
        .withFields(['q.total',
            'q.id',
            'q.order_id',
            'q.customer_id',
            'q.shipping_id',
            'q.billing_id',
            'q.round_total',
            'q.total',
            'q.sub_total',
            'q.total_cgst',
            'q.total_sgst',
            'q.total_igst',
            'q.created',
            'q.updated',
            'c.first_name'

        ])
        .filter({ 'q.id': Id })
        .get()
        .then(quote => {
            if (quote) {
                res.status(200).json(quote);
                console.log('title name desc', quote)
            } else {
                res.json({ message: `No invoice found` });
            }
        }).catch(err => res.json(err));
});


// get single tax invoice

router.get('/cashInvoice/:Id', (req, res) => {
    let Id = req.params.Id;
    database.table('cash_invoice as q')
    .join([
        {
            table: "customer as c",
            on: `q.customer_id = c.customer_id`
        },
        // {
        //     table: "customer_address as ca",
        //     on: `q.shipping_id = ca.id`
        // }
    ])
        .withFields(['q.total',
            'q.id',
            'q.order_id',
            'q.customer_id',
            'q.shipping_id',
            'q.billing_id',
            'q.round_total',
            'q.total',
            'q.sub_total',
            'q.total_cgst',
            'q.total_sgst',
            'q.total_igst',
            'q.created',
            'q.updated',
            'c.first_name'

        ])
        .filter({ 'q.id': Id })
        .get()
        .then(quote => {
            if (quote) {
                res.status(200).json(quote);
                console.log('title name desc', quote)
            } else {
                res.json({ message: `No invoice found` });
            }
        }).catch(err => res.json(err));
});


// get all delivery challan list

router.get('/deliveryChallan/all', (req, res) => {
    let Id = req.params.Id;
    database.table('delivery_challan as q')
    .join([
        {
            table: "customer as c",
            on: `q.customer_id = c.customer_id`
        },
        // {
        //     table: "customer_address as ca",
        //     on: `q.shipping_id = ca.id`
        // }
    ])
        .withFields([
            'q.id',
            'q.backorder_id',
            'q.customer_id',
            'q.shipping_id',
            'q.billing_id',
            'q.total_quantity',
            'q.total_price',
            'q.created',
            'q.updated',
            'c.first_name'

        ])
        // .filter({ 'q.id': Id })
        .getAll()
        .then(quote => {
            if (quote) {
                res.status(200).json(quote);
                console.log('title name desc', quote)
            } else {
                res.json({ message: `No invoice found` });
            }
        }).catch(err => res.json(err));
});

//get delivery challan

router.get('/singleDeliveryChallan/:Id', (req, res) => {
    let Id = req.params.Id;
    database.table('delivery_challan_detail as q')
        .join([
            {
                table: "delivery_challan as ca",
                on: `q.delivery_challan_id = ca.id`
            },
            {
                table: "products as p",
                on: `q.product_id = p.id`
            },
            {
                table: "customer as c",
                on: `ca.customer_id = c.customer_id`
            },
            {
                table: "customer_address as cad",
                on: `ca.shipping_id = cad.id`
            },
            {
                table: "ps_country as cz",
                on: `cad.country_id = cz.id_country`
            },
            {
                table: "ps_country_lang as cal",
                on: `cal.id_country = cz.id_country`
            },
            {
                table: "ps_state as cs",
                on: `cs.id_state = cad.state_id`
            }
        ])
        .withFields([
            'q.id',
            'q.delivery_challan_id',
            'q.invoice_id',
            'q.product_id',
            'q.quantity',
            'q.price',
            'q.price_after_discount',
            'q.line_total',
            'ca.customer_id',
            'ca.backorder_id',
            'ca.shipping_id',
            'ca.billing_id',
            'ca.total_quantity',
            'ca.total_price',
            'ca.created',
            'p.title',
            'c.first_name',
            'c.second_name',
            'c.mobile',
            'cad.company_name',
            'cad.address1',
            'cad.address2',
            'cad.city',
            'cad.pincode',
            'cal.name as country',
            'cs.name as state',
            
        ])
        .filter({ 'ca.id': Id })
        .getAll()
        .then(dc => {
            if (dc) {
                res.status(200).json(dc);
                console.log('DC', dc)
            } else {
                res.json({ message: `No DC found with id ${Id}` });
            }
        }).catch(err => res.json(err));
});





module.exports = router;
