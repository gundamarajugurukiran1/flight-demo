const {createUser, userLogin, searchFlight, flightbooking,  deleteBookingPnr, getDetailsEmail, getDetailspnr} = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("./auth/token_validation");


router.post("/",checkToken, createUser);
router.post("/userlogin", userLogin);
router.post("/flightsearch",checkToken, searchFlight);
router.post("/booking/:id",checkToken, flightbooking);
router.get("/:pnr", checkToken,getDetailspnr);
router.get("/",checkToken,getDetailsEmail);
router.delete("/:pnr",checkToken,deleteBookingPnr);


module.exports = router;