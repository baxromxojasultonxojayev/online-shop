const {Router} = require('express')
const users = require('../data')


const router = Router()

router.get('/', (req, res) =>{
  res.render('references', {
    title: 'Book Sales',
    path: "/references",
    ...req.user

  })
})

module.exports = {
  path: '/references',
  router: router
}