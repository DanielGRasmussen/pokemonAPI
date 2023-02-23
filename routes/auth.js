const express = require("express");
const router = express.Router();

// Redirect the user to the Google signin page
const passport = require("../passportConfig");

router.get("/", passport.authenticate("google", { scope: ["profile"] }));
// Retrieve user data using the access token received
router.get(
	"/callback",
	passport.authenticate("google", { failureRedirect: "/login" }),
	(req, res) => {
		// Redirect to the home page on successful login
		res.redirect("/");
	}
);

router.get("/logout", (req, res, next) => {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		req.session.destroy(function (err) {
			if (err) {
				return next(err);
			}
			res.redirect("/");
		});
	});
});

module.exports = router;
