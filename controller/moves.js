const mongo = require("../mongo");

exports.getMove = function (req, res) {
	const move = req.params.move;
	mongo.getByName("moves", move).then((move) => {
		if (move) {
			res.setHeader("Content-Type", "application/json");
			res.status(200).json(move);
		} else {
			res.status(404).send("Move not found.");
		}
	});
};

exports.addMove = function (req, res) {
	const doc = {
		name: req.body.name,
		type: req.body.type,
		power: req.body.power,
		accuracy: req.body.accuracy
	};

	const allFieldsExist = doc.name && doc.type && doc.power && doc.accuracy;

	if (allFieldsExist) {
		mongo.post("moves", doc).then((response) => {
			if (response.acknowledged) {
				res.status(201).json(response.insertedId);
			} else {
				res.status(500).json(
					response.error || "Some error occurred while creating the move."
				);
			}
		});
	} else {
		res.status(400).json("All fields must be filled out.");
	}
};

exports.updateMove = function (req, res) {
	const id = req.params.id;
	const doc = {
		name: req.body.name,
		type: req.body.type,
		power: req.body.power,
		accuracy: req.body.accuracy
	};

	const allFieldsExist = doc.name && doc.type && doc.power && doc.accuracy;
	const validId = id.length === 24;

	if (allFieldsExist && validId) {
		mongo.put("moves", id, doc).then((response) => {
			if (response.modifiedCount > 0) {
				res.status(204).send();
			} else {
				if (!response.length) {
					res.status(404).json(response.error || "Move was not found.");
				} else {
					res.status(500).json(
						response.error || "Some error occurred while updating the move."
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

exports.deleteMove = function (req, res) {
	const id = req.params.id;

	if (id.length === 24) {
		mongo.delete("moves", id).then((response) => {
			if (response.deletedCount > 0) {
				res.status(204).send();
			} else {
				if (!response.length) {
					res.status(404).json(response.error || "Move was not found.");
				}
				res.status(500).json(
					response.error || "Some error occurred while deleting the move."
				);
			}
		});
	} else {
		res.status(400).json("Invalid ID.");
	}
};
