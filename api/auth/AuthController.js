var User = require('../user/User')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
var { router, config, VerifyToken } = require('../usage')

router.post('/register', function(req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8)

  User.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword
  },
  function (err, user) {
    if(err) {
      throw err
      return res.status(500).send("There was a problem registering the user.")
    }
    var token = jwt.sign(
      { id: user._id },
      config.secret,
      { expiresIn: 0 } // set 86400 for expires in 24 hours or set 0 for never expires
    )
    res.status(200).send({
      auth: true,
      token: token
    })
  })
})

router.post('/login', function(req, res) {
  User.findOne(
    { email: req.body.email },
    (err, user) => {
      // Server Error
      if (err) {
        throw err
        return res.status(500).send('Error on the server.')
      }
      // No User in DB
      if (!user)
        return res.status(404).send('No user found.')
      // Check Password Matching
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
      if (!passwordIsValid)
        return res.status(401).send({
          auth: false,
          token: null
        })
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      })
      res.status(200).send({ auth: true, token: token })
    }
  )
})

router.get('/me', VerifyToken, (req, res, next) => {
  User.findById(
    req.userId,
    { password: 0 },
    (err, user) => {
      if (err){
        throw err
        return res.status(500).send("There was a problem finding the user.")
      }
      if (!user)
        return res.status(404).send("No user found.")
      res.status(200).send(user)
    })
})

module.exports = router
