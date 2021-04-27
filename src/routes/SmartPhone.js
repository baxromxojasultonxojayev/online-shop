const {Router} = require('express')
const users = require('../data')


const router = Router()

router.get('/', (req, res) =>{
  res.render('phones', {
    title: 'Smart Phones',
    path: "/phones",
    ...req.user

  })
})

module.exports = {
  path: '/phones',
  router: router
}