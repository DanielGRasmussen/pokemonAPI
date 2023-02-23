const express = require("express");
const router = express.Router();
const movesController = require("../controller/moves");

router.get("/:move", (req, res) => {
	// Check if the user is authenticated
	if (req.isAuthenticated()) {
		movesController.getMove(req, res);
	} else {
		// Redirect to the login page if the user is not authenticated
		res.redirect("/auth/");
	}
});

router.post("/", (req, res) => {
	// Check if the user is authenticated
	if (req.isAuthenticated()) {
		movesController.addMove(req, res);
	} else {
		// Redirect to the login page if the user is not authenticated
		res.redirect("/auth/");
	}
});

router.put("/:id", (req, res) => {
	// Check if the user is authenticated
	if (req.isAuthenticated()) {
		movesController.updateMove(req, res);
	} else {
		// Redirect to the login page if the user is not authenticated
		res.redirect("/auth/");
	}
});

router.delete("/:id", (req, res) => {
	// Check if the user is authenticated
	if (req.isAuthenticated()) {
		movesController.deleteMove(req, res);
	} else {
		// Redirect to the login page if the user is not authenticated
		res.redirect("/auth/");
	}
});

module.exports = router;
