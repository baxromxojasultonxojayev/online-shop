const {Router} = require('express')
const users = require('../data')


const router = Router()

router.get('/', (req, res) =>{
  res.render('index', {
    title: 'Homepage',
    path: "/",
    ...req.user

  })
})

module.exports = {
  path: '/',
  router: router
}