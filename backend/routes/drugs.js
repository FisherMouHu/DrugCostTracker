const router = require('express').Router()
let Drug = require('../models/drugModel')

router.route('/').get((req, res) => {
  Drug.find()
    .then(drugs => res.json(drugs))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
  const brandName = req.body.brandName
  const name = req.body.name
  const symptoms = req.body.symptoms
  const price = Number(req.body.price)

  const newDrug = new Drug({
    brandName,
    name,
    symptoms,
    price
  })

  newDrug.save()
    .then(() => res.json('Drug added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    Drug.findById(req.params.id)
      .then(drug => res.json(drug))
      .catch(err => res.status(400).json('Error: ' + err))
})
  
router.route('/:id').delete((req, res) => {
    Drug.findByIdAndDelete(req.params.id)
      .then(() => res.json('Drug deleted!'))
      .catch(err => res.status(400).json('Error: ' + err))
})
  
router.route('/update/:id').post((req, res) => {
    Drug.findById(req.params.id)
      .then(drug => {
        drug.brandName = req.body.brandName
        drug.name = req.body.name
        drug.symptoms = req.body.symptoms
        drug.price = Number(req.body.price)
  
        drug.save()
          .then(() => res.json('Drug updated!'))
          .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router