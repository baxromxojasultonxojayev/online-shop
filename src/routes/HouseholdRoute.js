const {Router} = require('express')
const users = require('../data')


const router = Router()

router.get('/', (req, res) =>{
  res.render('household', {
    title: 'Homepage',
    path: "/household",
    ...req.user

  })
})

module.exports = {
  path: '/household',
  router: router
}