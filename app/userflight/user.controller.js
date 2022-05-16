const { createuser, getByUserUsername, search, booking, bookingdetails, deletebooking, bookingdetailspnr } = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  searchFlight: (req, res) => {
    const body = req.body;
    console.log(body);
    search(body, (err, results) => {
      //console.log(results);
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "No Flights found!",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  flightbooking: (req, res) => {
    const body = req.body;
    const flight_id = req.params.id;
    booking(flight_id,body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Db connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  getDetailsEmail:(req,res) => {
    console.log(req);
    const body = req.body
    //const email = req.params.email;
    //console.log(email);
    bookingdetails(body, (err, results) => {
      console.log(results);
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "No booking found!",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getDetailspnr:(req,res) => {
    const pnr = req.params.pnr;
    //console.log(body);
    bookingdetailspnr(pnr, (err, results) => {
      //console.log(results);
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "No booking found!",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  deleteBookingPnr:(req , res) => {
    const pnr = req.params.pnr;
    console.log(pnr);
    deletebooking(pnr,(err,results)=> {
      console.log(results)
      if(err){
        console.log(err);
      }
      if(!results) {
        return res.json({
          success: 0,
          message: "No booking found!",
        });
      }
      return res.json({
        success: 1,
        message: "booking deleted successfully",
      });
    });
  },
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    createuser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Db connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },
  userLogin: (req, res) => {
    const body = req.body;
    getByUserUsername(body.username, (err, results) => {
      console.log(results, body);
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          message: " Invalid user or password!!"
        })
      }
      const salt = genSaltSync(10);
      results.password = hashSync(results.password, salt);
      const result = compareSync(body.password, results.password)
      console.log(result);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwerty1234", { expiresIn: "1h" });
        return res.json({
          success: 1,
          message: " Login successful",
          token: jsontoken
        })
      }
      else {
        return res.json({
          success: 0,
          message: " Invalid user or  password"
        })
      }
    });
  },
};