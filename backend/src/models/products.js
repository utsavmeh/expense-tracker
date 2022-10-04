const mongoose = require('mongoose')
const validator = require('validator')

const productSchema = new mongoose.Schema(
  {
    // Retailer: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   requires: true,
    //   ref: 'Retailer',
    // },
    productName: {
      type: String,
      required: true,
      minlength: 3,
    },
    productImage: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      minlength: 0,
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
    },
    category: {
      type: String,
      required: true,
      minlength: 3,
    },
    rating: {
      type: Number,
      required: true,
      minlength: 0,
      maxlength: 5,
    },
    quantity: {
      type: Number,
      required: true,
      minlength: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Product = new mongoose.model('Product', productSchema)
module.exports = { Product, productSchema }
