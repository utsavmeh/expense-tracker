const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");
const Retailer = mongoose.model("Retailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requireRetailerLogin = require("../middleware/requireRetailerLogin");
const authUser = require("../middleware/authUserRoles");
const requireCustomerLogin = require("../middleware/requireCustomerLogin");

require("dotenv").config({
	path: "./src/.env",
});
const jwt_secret = process.env.JWT_SECRET;

router.post("/retailers/signup", (req, res) => {
	const veritxt = "hhjj";
	const {
		productName,
		productImage,
		price,
		description,
		category,
		rating,
		quantity,
		username,
		shopname,
		email,
		phone,
		password,
		adhaar,
		pan,
		role,
		address,
		gst,
		images,
	} = req.body;
	if (
		!username ||
		!shopname ||
		!email ||
		!phone ||
		!password ||
		!adhaar ||
		!pan ||
		!veritxt ||
		!address ||
		!gst ||
		!images
	) {
		return res.status(422).json({ error: "Please add all the fields!" });
	}
	let retailer;
	Retailer.findOne({ email: email })
		.then((savedRetailer) => {
			if (savedRetailer) {
				return res
					.status(422)
					.json({ error: "Retailer already exists with that email!" });
			}
			bcrypt.hash(password, 12).then((hashedpassword) => {
				if (
					productName ||
					productImage ||
					price ||
					description ||
					category ||
					rating ||
					quantity
				) {
					retailer = new Retailer({
						products: [
							{
								productName,
								productImage,
								price,
								description,
								category,
								rating,
								quantity,
							},
						],
						username,
						shopname,
						email,
						phone,
						adhaar,
						pan,
						veritxt,
						address,
						gst,
						images,
						password: hashedpassword,
					});
				} else {
					retailer = new Retailer({
						username,
						shopname,
						email,
						phone,
						adhaar,
						pan,
						veritxt,
						address,
						gst,
						images,
						password: hashedpassword,
					});
				}

				retailer
					.save()
					.then((retailer) => {
						res.json({ message: "Saved Successfully!" });
					})
					.catch((err) => {
						console.log(err);
					});
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

router.post("/retailers/signin", (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(422).json({ error: "Please add Email or Password!" });
	}
	Retailer.findOne({ email: email }).then((savedRetailer) => {
		if (!savedRetailer) {
			return res.status(422).json({ error: "Invalid Email or Password!" });
		}
		bcrypt
			.compare(password, savedRetailer.password)
			.then((doMatch) => {
				if (doMatch) {
					const token = jwt.sign(
						{ _id: savedRetailer._id, role: savedRetailer.role },
						jwt_secret
					);
					const { _id, email, role } = savedRetailer;
					res.json({
						token,
						retailer: { _id, email, role },
					});
				} else {
					return res.status(422).json({ error: "Invalid Email or Password!" });
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});
});

router.get("/retailers", requireCustomerLogin, (req, res) => {
	Retailer.find({})
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			res.send(err);
		});
});

module.exports = router;
