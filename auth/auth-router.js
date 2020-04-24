const router = require('express').Router();
const Users = require('./usersModel');
const bcrypt = require('bcrypt');

router.post('/register', newUserVerification, (req, res) => {
  const user = req.body;
  const rounds = process.env.HASH_ROUNDS || 12
  const hash = bcrypt.hashSync(user.password, rounds)
  user.password = hash
  
  Users.add(user)
    .then(addedUser => {
      console.log(addedUser)
      res.status(201).json({ message: 'user created successfully.', addedUser })
    })
    .catch(err => res.status(500).json({ errorMessage: `Internal server error`, err }))
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      if(user && bcrypt.compareSync(password, user.password)) {
        req.session.loggedIn = true
        res.status(200).json({ message: `Permitted Access.` });
      } else {
        res.status(401).json({ message: `Unauthorized Access, please login.` })
      }
    })
    .catch(err => res.status(500).json({ errorMessage: `Internal server error`, err }))
});

module.exports = router;

function newUserVerification(req, res, next) {
  const user = req.body;

  if((user.username && user.password) && (user.username.length > 3 && user.password.length > 5)) {
    next()
  }
}