const { createadmin, getByAdminUsername, addflight, updateFlight , deleteFlight} = require("./admin.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
module.exports = {
  adminAddFlight: (req, res) => {
    const body = req.body;
    //console.log(body);
    addflight(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "DB connection error"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      })

    });
  },
  AdminUpadteFlight: (req, res) => {
    const body = req.body;
    //console.log(body);
    updateFlight(body, (err, results) => {
      console.log(results);
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "failed to update the flight!",
        });
      }
      return res.json({
        success: 1,
        message: "updated flight sucessfully"
      });
    });
  },
  adminDeleteFlight: (req, res) => {
    //console.log(req.params.id);
    const flightId = req.params.Id;
    //const flightId= req.body.flight_Id;
    console.log(flightId);
    deleteFlight(flightId, (err, results) => {
      //console.log(results);
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          sucess: 0,
          message: "record not found",
        });
      }
      return res.json({
        sucess: 1,
        message: "Flight deleted sucessfully",
      });
    });
  },
  createAdmin: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    createadmin(body, (err, results) => {
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
  adminLogin: (req, res) => {
    const body = req.body;
    getByAdminUsername(body.username, (err, results) => {
      //console.log(results,body);
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
      //console.log(result);
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
  }
};