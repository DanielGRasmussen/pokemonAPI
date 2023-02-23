const express = require("express");
const router = express.Router();
const pokemonController = require("../controller/pokemon");

router.get("/:pokemon", (req, res) => {
	// Check if the user is authenticated
	if (req.isAuthenticated()) {
		pokemonController.getPokemon(req, res);
	} else {
		// Redirect to the login page if the user is not authenticated
		res.redirect("/auth/");
	}
});

router.post("/", (req, res) => {
	// Check if the user is authenticated
	if (req.isAuthenticated()) {
		pokemonController.addPokemon(req, res);
	} else {
		// Redirect to the login page if the user is not authenticated
		res.redirect("/auth/");
	}
});

router.put("/:id", (req, res) => {
	// Check if the user is authenticated
	if (req.isAuthenticated()) {
		pokemonController.updatePokemon(req, res);
	} else {
		// Redirect to the login page if the user is not authenticated
		res.redirect("/auth/");
	}
});

router.delete("/:id", (req, res) => {
	// Check if the user is authenticated
	if (req.isAuthenticated()) {
		pokemonController.deletePokemon(req, res);
	} else {
		// Redirect to the login page if the user is not authenticated
		res.redirect("/auth/");
	}
});

module.exports = router;
