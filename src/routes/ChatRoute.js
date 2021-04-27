const {Router} = require('express')
const messages = require("../messages")
const users = require('../data')
const moment = require('moment')
const AuthMiddleware = require('../middleware/AuthMiddleware')
const { v4: uuidv4 } = require('uuid');

const router = Router()

router.use(AuthMiddleware.middleware)

router.get('/', (req, res) =>{
  let letter = messages.reverse()
  letter = letter.map(message =>{
    return{
      ...message,
      user: users.find(user => user.id == message.user),
      time: moment(message.time).format('LLL')
    }
  })
  res.render('chat', {
    ...req.user,
    path: '/chat',
    messages: letter
  })
})

router.post('/', (req, res) =>{
  let letter = messages.reverse()
  letter = letter.map(message =>{
    return{
      ...message,
      user: users.find(user => user.id == message.user),
      time: moment(message.time).format('LLL')
    }
  })
  try{
    let { message } = req.body
    console.log(message);
    if(!message) throw ("Message not defined")
    message = message.trim()
    messages.push({
      body: message,
      id: uuidv4(),
      user: req.user.id,
      time: Date.now()
    })
    res.redirect('/chat')
  }
  catch(e){
    res.render('chat', {
      ...req.user,
      error: e  + ""
    })
  }
})

module.exports = {
  path: '/chat',
  router: router
}