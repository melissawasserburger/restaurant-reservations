const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// root = /reservations/
router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);
router.route("/:table_id/seat").all(methodNotAllowed);

module.exports = router;
