const mongoose = require('mongoose')
const validator = require('validator')

const customerSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      minlength: 3,
    },
    lname: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'Email already exists'],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid Email')
        }
      },
    },
    phone: {
      type: Number,
      minlength: 10,
      maxlength: 10,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    role: {
      type: String,
      default: 'customer',
      enum: ['customer', 'retailer', 'admin', 'superadmin', 'role5'],
    },
  },
  {
    timestamps: true,
  }
)

const Customer = new mongoose.model('Customer', customerSchema)

module.exports = Customer
