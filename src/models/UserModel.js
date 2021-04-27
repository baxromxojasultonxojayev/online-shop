const client = require('../modules/mongo')
const { Schema } = require('mongoose')

String.prototype.toObjectId = function() {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  }
})

async function UserModel () {

  let db = await client()
  return await db.model('users', UserSchema)
}

async function createUser(name, email, password) {
  if(!(email && password)){
    throw new ReferenceError("Email or Password is not found")
  }
  let model = await UserModel()
  let data = await model.create({name, email, password})
  await data.save()
}

async function findUser(email){
  let model = await UserModel()
  let response = await model.findOne({ email: email})
  return response
}



module.exports = {
  createUser,
  findUser
}