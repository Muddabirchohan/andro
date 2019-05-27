const express = require('express');
const router = express.Router();
const Product = require('../models/product');


router.get('/getproducts', (req, res, next) => {
    let i = 0;

    Product.find({}, function (err, users) {
        var userMap = [];
        users.forEach(function (user) {
            if (user.status != "unapproved"){
                userMap[i++] = user;
            }
        });
        res.send(userMap);
    });

})

router.get('/webproducts', (req, res, next) => {
    let i = 0;
    Product.find({}, function (err, users) {
        var userMap = [];
        users.forEach(function (user) {
            if (user.category === "Web App" && user.status != "unapproved") {
                userMap[i++] = user
            }
        });
        console.log(userMap);
        res.send(userMap);
    })
        .catch(err => next(err));
})

router.get('/androidproducts', (req, res, next) => {
    let i = 0;
    Product.find({}, function (err, users) {
        var userMap = [];
        users.forEach(function (user) {

            if (user.category === "Android App" || user.category === "Ios App" || user.category === "Android/Ios App" && user.status != "unapproved") {
                userMap[i++] = user
            }
        });
        console.log(userMap);
        res.send(userMap);
    })
        .catch(err => next(err));
})

router.get('/vrar', (req, res, next) => {
    let i = 0;
    Product.find({}, function (err, users) {
        var userMap = [];
        users.forEach(function (user) {
            if (user.category === "VR" || user.category === "AR" && user.status != "unapproved") {
                userMap[i++] = user
            }
        });
        console.log(userMap);
        res.send(userMap);
    })
        .catch(err => next(err));
})

router.get('/ai', (req, res, next) => {
    let i = 0;
    Product.find({}, function (err, users) {
        var userMap = [];
        users.forEach(function (user) {
            if (user.category === "AI" && user.status != "unapproved") {
                userMap[i++] = user
            }
        });
        console.log(userMap);
        res.send(userMap);
    })
        .catch(err => next(err));
})

router.get('/ecommerce', (req, res, next) => {
    let i = 0;
    Product.find({}, function (err, users) {
        var userMap = [];
        users.forEach(function (user) {
            if (user.category === "Ecommerce" && user.status != "unapproved") {
                userMap[i++] = user
            }
        });
        console.log(userMap);
        res.send(userMap);
    })
        .catch(err => next(err));
})

router.get('/iot', (req, res, next) => {
    let i = 0;
    Product.find({}, function (err, users) {
        var userMap = [];
        users.forEach(function (user) {
            if (user.category === "IOT" && user.status != "unapproved") {
                userMap[i++] = user
            }
        });
        console.log(userMap);
        res.send(userMap);
    })
        .catch(err => next(err));
})

router.get('/:id', (req, res, next) => {

    Product.findById(req.params.id)
        .then(docs => {
            if (!docs) { return res.status(404).end() }
            return res.status(200).json(docs)
        })
        .catch(err => next(err));
})

router.post('/getSellerProducts', (req, res, next) => {
    let i = 0;
    Product.find({}, function (err, products) {
        var productMap = [];
        products.forEach(function (product) {
            if (product.seller_id.equals(req.query.seller_id)) {
                productMap[i++] = product
            }
        });
        console.log(productMap);
        res.send(productMap);
    })
        .catch(err => next(err));
})

router.get('/getSellerProducts/:myid',(req,res,next)=>{
    let i=0;
    Product.find({}, function (err,products) {
        var productMap = [];
        products.forEach( function (product) { 
            if( product.seller_id.equals(req.params.myid)){
                productMap[i++] = product
            }
        });
        console.log(productMap);
        res.send(productMap);
    })
    .catch(err => next(err));
})

router.post('/postproduct', (req, res, next) => {
    let userObject = {
        seller_id: req.body.seller_id,
        pname: req.body.pname,
        pdescription: req.body.pdescription,
        screenShot: req.body.screenShot,
        exeUrl: req.body.exeUrl,
        demoVideoUrl: req.body.demoVideoUrl,
        hostUrl: req.body.hostUrl,
        cost: req.body.cost,
        category: req.body.category,
        screenShotPublicId: req.body.screenShotPublicId,
        status: "unapproved"
    }
    Product.create(userObject).then(function (user) {
        console.log(user);
        res.send(user)
    }).catch(next)
})

router.patch('/updateProduct', (req, res, next) => {
    Product.updateOne({ "_id": req.query.productid },
        {
            $set:
            {
                "pname": req.body.pname,
                "pdescription": req.body.pdescription,
                "category": req.body.category,
                "exeUrl": req.body.exeUrl,
                "hostUrl": req.body.hostUrl,
                "demoVideoUrl": req.body.demoVideoUrl,
                "screenShot": req.body.screenShot,
                "cost": req.body.cost,
                "screenShotPublicId": req.body.screenShotPublicId
            }

        }).then(function (user) {
            res.send({ updateStatus: 'updated' });
        })

});


router.patch('/:productid', (req, res, next) => {
    Product.updateOne({ "_id": req.params.productid.toString() },
        {
            $set:
            {
                "pname": req.body.pname,
                "pdescription": req.body.pdescription,
                "category": req.body.category,
                "exeUrl": req.body.exeUrl,
                "hostUrl": req.body.hostUrl,
                "demoVideoUrl": req.body.demoVideoUrl,
                "screenShot": req.body.screenShot,
                "cost": req.body.cost
            }
        }).then(function (user) {
            res.send(user);
        })

});

router.delete('/delProduct', (req, res, next) => {

    Product.deleteOne({ "_id": req.query.productid }).then(function (user) {
        res.send({ delStatus: 'deleted' });
    }).catch(next);
});

router.delete('/:productid', (req, res, next) => {

    Product.deleteOne({ "_id": req.params.productid.toString() }).then(function (user) {
        res.send("sussessfull deleted");
    }).catch(next);
});

module.exports = router;
