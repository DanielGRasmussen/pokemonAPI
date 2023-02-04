const express = require("express");
const router = express.Router();
const movesController = require("../controller/moves");

router.get("/:move", movesController.getMove);

router.post("/", movesController.addMove);

router.put("/:id", movesController.updateMove);

router.delete("/:id", movesController.deleteMove);

module.exports = router;
