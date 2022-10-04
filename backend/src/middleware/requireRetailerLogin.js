const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Retailer = mongoose.model("Retailer");

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
				.json({ error: "You must be logged in as a retailer to access this" });
		}

		const { _id } = payload;
		Retailer.findById(_id).then((retailerdata) => {
			if (retailerdata === null) {
				return res.status(401).json({ error: " You are not a retailer" });
			}
			req.retailer = retailerdata;
			next();
		});
	});
};
