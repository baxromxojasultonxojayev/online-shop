const {Router} = require('express')
const users = require('../data')
const router = Router()


router.get('/', (req, res)=>{
  res
    .clearCookie('token')
    .redirect('/')
})

module.exports = {
  path: '/exit',
  router: router
}