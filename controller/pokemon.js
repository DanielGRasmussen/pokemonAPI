const mongo = require("../mongo");

exports.getPokemon = function (req, res) {
	const pokemon = req.params.pokemon;
	mongo.getByName("pokemon", pokemon).then((pokemon) => {
		if (pokemon) {
			res.setHeader("Content-Type", "application/json");
			res.status(200).json(pokemon);
		} else {
			res.status(404).json("Pokemon not found.");
		}
	});
};

exports.addPokemon = function (req, res) {
	const doc = {
		name: req.body.name,
		types: req.body.types,
		generation: req.body.generation,
		pokedex_number: req.body.pokedex_number,
		height: req.body.height,
		weight: req.body.weight,
		evolve_from: req.body.evolve_from,
		evolve_to: req.body.evolve_to
	};

	const allFieldsExist =
		doc.name && doc.types && doc.generation && doc.pokedex_number && doc.height && doc.weight;

	if (allFieldsExist) {
		mongo.post("pokemon", doc).then((response) => {
			if (response.acknowledged) {
				res.status(201).json(response.insertedId);
			} else {
				res.status(500).json(
					response.error || "Some error occurred while creating the Pokemon."
				);
			}
		});
	} else {
		res.status(400).json("All fields must be filled out.");
	}
};

exports.updatePokemon = function (req, res) {
	const id = req.params.id;
	const doc = {
		name: req.body.name,
		types: req.body.types,
		generation: req.body.generation,
		pokedex_number: req.body.pokedex_number,
		height: req.body.height,
		weight: req.body.weight,
		evolve_from: req.body.evolve_from,
		evolve_to: req.body.evolve_to
	};

	const allFieldsExist =
		doc.name && doc.types && doc.generation && doc.pokedex_number && doc.height && doc.weight;
	const validId = id.length === 24;

	if (allFieldsExist && validId) {
		mongo.put("pokemon", id, doc).then((response) => {
			if (response.modifiedCount > 0) {
				res.status(204).send();
			} else {
				if (!response.length) {
					res.status(404).json(response.error || "Pokemon was not found.");
				} else {
					res.status(500).json(
						response.error || "Some error occurred while updating the Pokemon."
					);
				}
			}
		});
	} else if (validId) {
		res.status(400).json("All fields must be filled out.");
	} else {
		res.status(400).json("Invalid ID.");
	}
};

exports.deletePokemon = function (req, res) {
	const id = req.params.id;

	if (id.length === 24) {
		mongo.delete("pokemon", id).then((response) => {
			if (response.deletedCount > 0) {
				res.status(204).send();
			} else {
				if (!response.length) {
					res.status(404).json(response.error || "Pokemon was not found.");
				}
				res.status(500).json(
					response.error || "Some error occurred while deleting the Pokemon."
				);
			}
		});
	} else {
		res.status(400).json("Invalid ID.");
	}
};
