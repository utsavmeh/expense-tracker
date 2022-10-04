const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");
const Retailer = mongoose.model("Retailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Product } = require("../models/products");
const RequireLogin = require("../middleware/requirelogin");

require("dotenv").config({
	path: "./src/.env",
});
const jwt_secret = process.env.JWT_SECRET;

router.post("/addproduct", (req, res) => {
	const {
		productName,
		productImage,
		price,
		description,
		category,
		rating,
		quantity,
	} = req.body;
	if (
		!productName ||
		!productImage ||
		!price ||
		!description ||
		!category ||
		!rating ||
		!quantity
	) {
		return res.status(422).json({ error: "Please add all the fields!" });
	}
	const new_product = new Product({
		productName,
		productImage,
		price,
		description,
		category,
		rating,
		quantity,
	});

	new_product
		.save()
		.then((product) => {
			res.json({ message: "Product added Successfully!" });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get("/products", RequireLogin, (req, res) => {
	Product.find({})
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			res.status(422).send(err);
		});
});

module.exports = router;
