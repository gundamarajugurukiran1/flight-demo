const { createAdmin, adminLogin, adminAddFlight, AdminUpadteFlight, adminDeleteFlight } = require("./admin.controller");
const router = require("express").Router();
const { checkToken } = require("./auth/token_validation");

router.post("/airline/inventory/add", checkToken, adminAddFlight);
router.post("/", checkToken, createAdmin);
router.patch("/airline/inventory/update", checkToken, AdminUpadteFlight);
router.delete("/block/:Id", checkToken, adminDeleteFlight);
router.post("/adminlogin", adminLogin);



module.exports = router;