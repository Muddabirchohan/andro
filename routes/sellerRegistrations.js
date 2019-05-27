const express = require('express');
const router = express.Router();
const User = require('../models/sellerRegistraion');

router.post('/postuser', (req, res, next) => {

  User.find({}, function (err, users) {
    let flg = false;
    users.forEach(function (user) {
      if (user.email === req.body.email) {
        console.log(user)
        res.send({ userStatus: 'exist' })
        flg = true;
      }
    });
    if (flg == false) {
      let userObject = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }
      User.create(userObject).then(function (user) {
        console.log(user)
        res.send({
          user,
          userStatus: "account created"
        })
      }).catch(next)
    }
  });
})

router.get('/getusers', (req, res, next) => {
  let i = 0;
  User.find({}, function (err, users) {
    var userMap = [];
    users.forEach(function (user) {
      userMap[i++] = user;
    });
    res.send(userMap);
    console.log(userMap)
  });
})

router.post('/getuser', (req, res, next) => {
  User.find({}, function (err, users) {
    let flg = false;
    users.forEach(function (user) {
      if (user.email === req.query.email && user.password === req.query.password) {
        console.log(user)
        res.send({
          user,
          userStatus: 'exist'
        })
        flg = true;
      }
    });
    if (flg == false) {
      res.send({ userStatus: "not exist" })
    }
  });
})

router.get('/:id', (req, res, next) => {

  User.findById(req.params.id)
    .then(docs => {
      if (!docs) { return res.status(404).end() }
      return res.status(200).json(docs)
    })
    .catch(err => next(err));
})




// router.get('/response', (req, res, next) => {

//   res.send("hello")
// })

router.patch('/updateUser', (req, res, next) => {
  User.updateOne({ "_id": req.query.id },
    {
      $set:
      {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,

      }
    }).then(function (user) {
      res.send({ updateStatus: 'updated' });
    })
});

router.delete('/delUser', (req, res, next) => {
  User.deleteOne({ "_id": req.query.id }).then(function (user) {
    res.send({ delStatus: 'deleted' });
  }).catch(next);
});

module.exports = router;