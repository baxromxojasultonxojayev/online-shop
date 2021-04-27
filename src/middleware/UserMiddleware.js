const users = require('../data')
const { checkToken } = require('../modules/jwt')
const { findUser } = require('../models/UserModel')

module.exports ={
  middleware: middleware,
  forAll: true
}

async function middleware (req, res, next){
  let token = req.cookies?.token
  if(token) {
    let user = checkToken(token)
    user = await findUser(user.email)
    if(user){
      req.user = {
        id: user._id,
        name: user.name,
        email: user.email
      }
    }
  }
  next()
}

