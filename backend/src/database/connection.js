const mongoose = require('mongoose')

require('dotenv').config({
  path: './src/.env',
})
const mongouri = "mongodb://localhost:27017"

mongoose
  .connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connection is successfull')
  })
  .catch((err) => {
    console.log('No Conection', err)
  })