const express = require("express");
const router = express.Router();
const movesController = require("../controller/moves");
const authenticate = require("../authenticate");

router.get("/:move", async (req, res) => {
	await authenticate(req, res, movesController.getMove);
});

router.post("/", async (req, res) => {
	await authenticate(req, res, movesController.addMove);
});

router.put("/:id", async (req, res) => {
	await authenticate(req, res, movesController.updateMove);
});

router.delete("/:id", async (req, res) => {
	await authenticate(req, res, movesController.deleteMove);
});

module.exports = router;
