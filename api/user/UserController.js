var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var { router, VerifyToken } = require('../usage/')
var User = require('./User') // Model

// CREATES A NEW USER
router.post('/', VerifyToken, (req, res) => {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8)
    User.create({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    },
    (err, user) => {
        if(err) {
          throw err
          return res.status(500).send("There was a problem adding the information to the database.")
        }
        res.status(200).send(user)
    })
})

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', VerifyToken, (req, res) => {
    User.find({}, (err, users) => {
        if(err) {
          throw err
          return res.status(500).send("There was a problem finding the users.")
        }
        res.status(200).send(users)
    })
})

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', VerifyToken, (req, res) => {
    User.findById(
      req.params.id,
      (err, user) => {
        if(err) {
          throw err
          return res.status(500).send("There was a problem finding the user.")
        }
        if (!user)
          return res.status(404).send("No user found.")
        res.status(200).send(user)
      }
    )
})

// DELETES A USER FROM THE DATABASE
router.delete('/:id', VerifyToken, (req, res) => {
    User.findByIdAndRemove(
      req.params.id,
      (err, user) => {
        if(err) {
          throw err
          return res.status(500).send("There was a problem deleting the user.")
        }
        res.status(200).send("User: "+ user.name +" was deleted.")
      }
    )
})

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', VerifyToken, (req, res) => {
    User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true},
      (err, user) => {
        if(err) {
          throw err
          return res.status(500).send("There was a problem updating the user.")
        }
        res.status(200).send(user)
      }
    )
})

module.exports = router
