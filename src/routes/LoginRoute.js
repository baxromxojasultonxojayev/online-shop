const {Router} = require('express')
const users = require('../data')
const { confirmHash } = require('../modules/crypt')
const { generateToken } = require('../modules/jwt')
const { findUser } = require('../models/UserModel')


const router = Router()

router.get('/', (req, res) =>{
  res.render('login', {
    title: 'Login Page',
    path: "/login",
    error: "",
    name: req.user?.name,
    email: req.user?.email

  })
})


router.post('/', async (req, res)=>{
  try{
    let {email, password} = req.body
    if(!(email && password)) throw ('Email or password is not found')

    let user = await findUser(email)
    console.log(user);
    if(!user) throw("User not found")
    let isTrust = await confirmHash(password, user.password)
    if(!isTrust) throw ('Incorrect password');
    let token = generateToken({email: user.email})

    res.cookie('token', token).redirect('/')
  }
  catch(e){
    res.render('login', {
      path: '/login',
      error: e + '',
      name: req.user?.name,
      email: req.user?.email
    })
  }
})

module.exports = {
  path: '/login',
  router: router
}


// function findUser(email){
//   return users.find(user => user.email == email)
// }