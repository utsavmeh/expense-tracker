const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");
const Retailer = mongoose.model("Retailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requireCustomerLogin = require("../middleware/requireCustomerLogin");
const { authRole, authUser } = require("../middleware/authUserRoles");
// const requireSignin = require('../middleware/authUserRoles')

require("dotenv").config({
	path: "./src/.env",
});
const jwt_secret = process.env.JWT_SECRET;

router.post("/customers/signup", (req, res) => {
	const { fname, lname, email, phone, password } = req.body;
	if (!email || !password || !fname || !lname || !phone) {
		return res.status(422).json({ error: "Please add all the fields!" });
	}
	Customer.findOne({ email: email })
		.then((savedCustomer) => {
			if (savedCustomer) {
				return res
					.status(422)
					.json({ error: "Customer already exists with that email!" });
			}
			bcrypt.hash(password, 12).then((hashedpassword) => {
				const customer = new Customer({
					fname,
					lname,
					email,
					phone,
					password: hashedpassword,
				});

				customer
					.save()
					.then((customer) => {
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

router.post("/customers/signin", (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(422).json({ error: "Please add Email or Password!" });
	}
	Customer.findOne({ email: email }).then((savedCustomer) => {
		if (!savedCustomer) {
			return res.status(422).json({ error: "Invalid Email or Password!" });
		}
		bcrypt
			.compare(password, savedCustomer.password)
			.then((doMatch) => {
				if (doMatch) {
					const token = jwt.sign({ _id: savedCustomer._id }, jwt_secret);
					const { _id, email, role } = savedCustomer;
					res.json({
						token,
						customer: { _id, email, role },
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

// router.get('/protected', requireCustomerLogin, (req, res) => {
//   res.send('hi')
// })

router.get("/protected", (req, res) => {
	const { authorization } = req.headers;
	const token = authorization.replace("Bearer ", "");
	jwt.verify(token, jwt_secret, (err, payload) => {
		if (err) {
			return res.status(401).json({ error: "you must be logged in" });
		}
		const { _id, role } = payload;
		res.send(payload);
		// res.send(role);
		// User.findById(_id).then((userdata) => {
		// 	req.user = userdata;
		// });
	});
});

module.exports = router;
