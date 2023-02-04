const mongo = require("../mongo");

exports.getMove = function (req, res) {
	const move = req.params.move;
	mongo.getByName("moves", move).then((move) => {
		if (move) {
			res.setHeader("Content-Type", "application/json").json(move).status(200);
		} else {
			res.send("Move not found").status(404);
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

	mongo.post("moves", doc).then((id) => {
		if (id) {
			res.send(id).status(201);
		} else {
			res.send("Creation failed").status(404);
		}
	});
};

exports.updateMove = function (req, res) {
	const id = req.params.id;
	const doc = {
		name: req.body.name,
		type: req.body.type,
		power: req.body.power,
		accuracy: req.body.accuracy
	};

	mongo.put("moves", id, doc).then((status) => {
		res.status(status);
	});
	res.send(doc);
};

exports.deleteMove = function (req, res) {
	const id = req.params.id;

	mongo.delete("moves", id).then((status) => {
		if (status == 200) {
			res.send("Deleted").status(status);
		} else {
			res.send("Deletion failed").status(status);
		}
	});
};
