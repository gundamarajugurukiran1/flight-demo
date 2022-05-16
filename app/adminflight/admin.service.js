const pool = require("./config/database");

module.exports = {
    addflight: (data, callback) => {
        pool.query(
            `insert into flight(flight_Id,airline_Name,from_Place,to_Place,start_date_time,end_date_time,scheduled_days,instrument_used,no_of_business_class_seats,no_of_non_business_class_seats,ticket_cost_business_class,ticket_cost_non_business_class,no_of_rows,meal) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.flightid,
                data.airline_name,
                data.from_place,
                data.to_place,
                data.start_datetime,
                data.end_datetime,
                data.scheduled_days,
                data.instrument_used,
                data.no_of_business_class,
                data.no_of_non_business_class,
                data.ticket_cost_business_class,
                data.ticket_cost_non_business_class,
                data.no_of_rows,
                data.meal
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        );
    },
    updateFlight: (data, callBack) => {
        pool.query(
            `update flight set airline_Name= ?,from_Place= ?,to_Place=?,start_date_time=?,end_date_time=?,scheduled_days=?,instrument_used=?,no_of_business_class_seats=?,no_of_non_business_class_seats=?,ticket_cost_business_class=?,ticket_cost_non_business_class=?,no_of_rows=?,meal=? where flight_Id = ?`,
            [

                data.airline_name,
                data.from_place,
                data.to_place,
                data.start_datetime,
                data.end_datetime,
                data.scheduled_days,
                data.instrument_used,
                data.no_of_business_class,
                data.no_of_non_business_class,
                data.ticket_cost_business_class,
                data.ticket_cost_non_business_class,
                data.no_of_rows,
                data.meal,
                data.flightid
            ],
            (error, results, fields) => {
                console.log(results);
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteFlight: (flight_Id, callBack) => {
        pool.query(
            `delete from flight where flight_Id = ?`,
            [flight_Id],
            (error, results, fields) => {
                console.log(results);
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    createadmin: (data, callback) => {
        pool.query(
            `insert into admin(admin_id,username,password) values(?,?,?)`,
            [
                data.adminid,
                data.user_name,
                data.password
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)

            }
        );
    },
    getByAdminUsername: (username, callback) => {
        pool.query(
            `SELECT * FROM admin WHERE username = ?`, [username], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    }
};