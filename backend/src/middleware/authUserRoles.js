const authUser = (req, res, next) => {
	console.log(req);
	if (req.user == null) {
		res.status(403);
		return res.send("You need to sign in");
	}
	next();
};

const authRole = (role) => {
	return (req, res, next) => {
		if (req.user.role !== role) {
			res.status(401);
			return res.send("Not allowed");
		}
		// console.log(req.user)
		next();
	};
};

module.exports = {
	authUser,
	authRole,
};
