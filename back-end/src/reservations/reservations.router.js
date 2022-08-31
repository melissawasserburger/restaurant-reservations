/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// root = /reservations/
router.route("/").all(methodNotAllowed);
router.route("/new").post(controller.create).all(methodNotAllowed);

module.exports = router;
