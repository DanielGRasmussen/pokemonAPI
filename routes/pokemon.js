const express = require("express");
const router = express.Router();
const pokemonController = require("../controller/pokemon");
// const passport = require("../passportConfig");
const { authenticate } = require("../authenticate");

router.get(
	"/:pokemon",
	// passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		await authenticate(req, res, pokemonController.getPokemon);
	}
);

router.post("/", async (req, res) => {
	await authenticate(req, res, pokemonController.addPokemon);
});

router.put("/:id", async (req, res) => {
	await authenticate(req, res, pokemonController.updatePokemon);
});

router.delete("/:id", async (req, res) => {
	await authenticate(req, res, pokemonController.deletePokemon);
});

module.exports = router;
