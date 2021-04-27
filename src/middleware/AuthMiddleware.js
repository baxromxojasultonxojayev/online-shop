const users = require('../data')
// const { findUser } = require('../models/UserModel')
const { checkToken } = require('../modules/jwt')


module.exports = {
  middleware: middleware,
  forAll: false
}

async function middleware (req, res, next){
  let token = req.cookies?.token
  if(token) {
    let user = await checkToken(token)
    user = await findUser(user.id)
    console.log(user);
    if(user){
      req.user = {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  }

  if(!req?.user){
    res.redirect('/')
    return 0
  }
  next()
}


function findUser(id){
  return users.find(user => user.id == id)
}