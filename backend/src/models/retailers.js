const mongoose = require("mongoose");
const validator = require("validator");
const { productSchema } = require("./products");
const retailerSchema = new mongoose.Schema(
	{
		products: [productSchema],
		username: {
			type: String,
			required: true,
			minlength: 3,
		},
		email: {
			type: String,
			required: true,
			unique: [true, "Email already exists"],
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("Invalid Email");
				}
			},
		},
		password: {
			type: String,
			minlength: 6,
			required: true,
		},
		shopname: {
			type: String,
			required: true,
			minlength: 3,
		},
		adhaar: {
			type: Number,
			minlength: 12,
			maxlength: 12,
			required: true,
			unique: true,
		},
		pan: {
			type: String,
			maxlength: 10,
			required: true,
			unique: true,
		},
		veritxt: {
			type: String,
			required: true,
		},
		phone: {
			type: Number,
			minlength: 10,
			maxlength: 10,
			required: true,
			unique: true,
		},
		address: {
			type: String,
			required: true,
		},
		gst: {
			type: String,
			minlength: 15,
			maxlength: 15,
			required: true,
			unique: true,
		},
		images: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			default: "retailer",
			enum: ["customer", "retailer", "admin", "superadmin", "role5"],
		},
	},
	{
		timestamps: true,
	}
);

const Retailer = new mongoose.model("Retailer", retailerSchema);

module.exports = Retailer;
