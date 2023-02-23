const jwt = require("jsonwebtoken");
const { findUserByGoogleId } = require("./userModel");

async function authenticate(req, res, next) {
	try {
		// Makeshift JWT verifier since authenticate jwt won't get called on for some reason.
		const coded = req.headers.authorization.split(" ")[1]; // JWT from header
		const decoded = jwt.decode(coded);
		const now = Math.floor(Date.now() / 1000); // Current Unix time in seconds
		if (now > decoded.exp) {
			res.status(401).json({ message: "Token expired" });
			return;
		}

		const user = await findUserByGoogleId(decoded.user.google.id);
		if (!user) {
			res.status(401).json({ message: "User not found" });
			return;
		}
		// User found, call the next function
		next(req, res);
	} catch (error) {
		res.status(500).json({ message: error });
	}
}
module.exports = authenticate;
