const express = require("express");
const adminRouter = express.Router();
let errorHandler = require('../middleware/errorHandler');
errorHandler = errorHandler.errorHandler
const passport = require("passport");
require("../middleware/passport")(passport);
const adminMidd = require('../middleware/admin.middleware');
const VertualRemebranceController = require("../controllers/admin/virtual_remebrance.controller");

// user authentication AuthController
adminRouter.post("/create-remebrance", VertualRemebranceController.createRmembrance);
adminRouter.post("/fetch-remebrance", VertualRemebranceController.fetchRmembrance);

module.exports = adminRouter;
