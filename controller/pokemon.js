const mongo = require("../mongo");

exports.getPokemon = function (req, res) {
	const pokemon = req.params.pokemon;
	mongo.getByName("pokemon", pokemon).then((pokemon) => {
		if (pokemon) {
			res.setHeader("Content-Type", "application/json").json(pokemon).status(200);
		} else {
			res.send("Pokemon not found").status(404);
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
		evolve_from: null,
		evolve_to: null
	};

	mongo.post("pokemon", doc).then((id) => {
		if (id) {
			res.send(id).status(201);
		} else {
			res.send("Creation failed").status(404);
		}
	});
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
		evolve_from: null,
		evolve_to: null
	};

	mongo.put("pokemon", id, doc).then((status) => {
		res.status(status);
	});
	res.send(doc);
};

exports.deletePokemon = function (req, res) {
	const id = req.params.id;

	mongo.delete("pokemon", id).then((status) => {
		if (status == 200) {
			res.send("Deleted").status(status);
		} else {
			res.send("Deletion failed").status(status);
		}
	});
};
