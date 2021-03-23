const router = require('express').Router()
let Brand = require('../models/brandModel')

// localhost:5000/brands/
router.route('/').get((req, res) => {
  Brand.find()
    .then(brands => res.json(brands))
    .catch(err => res.status(400).json('Error: ' + err))
})


// localhost:5000/users/add
router.route('/add').post((req, res) => {
  const name = req.body.name

  const newBrand = new Brand({name})

  newBrand.save()
    .then(() => res.json('Brand added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router