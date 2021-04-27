const mongoose = require('mongoose');
const url = "mongodb+srv://baxromxoja:baxromxoja_12@onlineshop.nzczd.mongodb.net/OnlineShop"


async function client () {
  return await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
}

module.exports = client
