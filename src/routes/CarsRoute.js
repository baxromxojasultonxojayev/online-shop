const {Router} = require('express')
const users = require('../data')


const router = Router()

router.get('/', (req, res) =>{
  res.render('cars', {
    title: 'Car Sales',
    path: "/cars",
    ...req.user

  })
})

module.exports = {
  path: '/cars',
  router: router
}