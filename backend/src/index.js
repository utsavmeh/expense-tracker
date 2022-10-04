const express = require('express')
require('./database/connection')

// const Customer = require('./models/customers')
// const Retailer = require('./models/retailers')
// const Product = require('./models/products')
const Expense = require('./models/expense')
const app = express()

require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(express.json())

// app.use(require('./routes/customer'))
// app.use(require('./routes/retailer'))
// app.use(require('./routes/product'))
app.use(require('./routes/expense'))

app.listen(port, () => {
  console.log(`Connection is setup at ${port}`)
})