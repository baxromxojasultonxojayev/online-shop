const {Router} = require('express')
const {createUser} = require('../models/UserModel')
const users = require('../data')
const { generateHash } = require('../modules/crypt')
// const { v4: uuidv4 } = require('uuid');

const router = Router()

router.get('/', (req, res) =>{
  res.render('registration', {
    title: "Registration Page",
    path: '/registration',
    user_name: req.user?.name,
    email: req.user?.email,
  })
})

router.post('/', async(req, res) =>{
  try{
    let {name, email, password} = req.body
    if(!(name && email && password)) throw new Error('Fileds are not completed')

    password = await generateHash(password)


    await createUser(name, email, password)

    // await createUser(email, password)

    res.redirect('/login')
  }
  catch(e){
    if(String(e).includes("duplicate key")){
      e = "Email or password is in use"
    }
    res.render('registration', {
      path: '/registration',
      error: e + '',
      user_name: req.user?.name,
      email: req.user?.email,
    })

  }
})

module.exports = {
  path: '/registration',
  router: router
}

// function findUser(email){
//   return users.find(user => user.email == email)
// }