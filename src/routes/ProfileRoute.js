const router = require('express').Router()
const users = require('../data')
const upload = require('express-fileupload')
// const { findUser } = require('../models/UserModel')

const fs = require('fs').promises
const fsSynch = require('fs')
const path = require('path')
const AuthMiddleware = require('../middleware/AuthMiddleware')
// const router = Router()

router.use(AuthMiddleware.middleware)

router.get('/:id',  (req, res) =>{
  let { id } = req.params
  let photoPath = path.join(__dirname, "..", "public", "img", `${id}.jpg`)
  console.log(id);
  let fileExist =  fsSynch.existsSync(photoPath)
  // console.log(fileExist);
  let user = findUser(id)
  // console.log(user);
  if(!user){
    res.redirect('/')
    return 0
  }

  res.render('profile', {
    photo: fileExist ? '/img/' + id + ".jpg" : "/img/notfound.jpg",
    ...req.user,
    profile: {
      ...user
    }
  })
})

router.post('/photo', upload(1024 * 10 * 1024), async (req, res)=>{
  if(req?.files?.photo){
    let photoPath = path.join(__dirname, "..", "public", "img", `${req.user.id}.jpg`)
    await fs.writeFile(photoPath, req.files?.photo?.data)
  }else{
    res.send({
      error: true
    })
  }
  res.send({
    ok: true
  })
})

module.exports = {
  path: '/user',
  router: router
}


function findUser(id){
  return users.find(user => user.id == id)
}