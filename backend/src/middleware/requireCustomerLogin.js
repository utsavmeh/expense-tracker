const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");

require("dotenv").config({
	path: "./src/.env",
});
const jwt_secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(401).json({ error: "You must be logged in!" });
	}
	const token = authorization.replace("Bearer ", "");
	jwt.verify(token, jwt_secret, (err, payload) => {
		if (err) {
			return res
				.status(401)
				.json({ error: "You are not allowed to access this page" });
		}

		const { _id } = payload;
		Customer.findById(_id).then((customerdata) => {
			if (customerdata === null) {
				return res.status(401).json({ error: "you are not a customer" });
			}
			req.customer = customerdata;
			next();
		});
	});
};
