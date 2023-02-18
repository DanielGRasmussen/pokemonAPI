const express = require("express");
const router = express.Router();
const pokemonController = require("../controller/pokemon");
const passport = require("passport");
const { findUserByGoogleId } = require("../userDb");

router.get(
	"/:pokemon",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const user = await findUserByGoogleId(req.user.google.id);
			if (!user) {
				return res.status(401).json({ message: "User not found" });
			}
			// User found, call the getPokemon function
			pokemonController.getPokemon();
		} catch (error) {
			next(error);
		}
	}
);

router.post("/", pokemonController.addPokemon);

router.put("/:id", pokemonController.updatePokemon);

router.delete("/:id", pokemonController.deletePokemon);

module.exports = router;
