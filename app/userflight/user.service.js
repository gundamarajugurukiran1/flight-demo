const { json } = require("body-parser");
const pool = require("./config/database");

module.exports = {
    search: (data, callback) => {
        pool.query(
            `select * from flight where from_place =? and to_place =? and start_date_time =? `,
            [//from_place =? and to_place =? and start_date_time =?
                     data.from_place,
                    data.to_place,
                    data.start_date_time
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    booking:(flight_id,data,callback) => {
         //const data =JSON.stringify(data1);
         //console.log(data)
         
        pool.query(
            `insert into booking(flight_id,flight_name,from_place,to_place,start_date_time,username,email,no_of_seats,passenger_details,meal,seat_numbers) values(?,?,?,?,?,?,?,?,?,?,?)`,
            [ 
                flight_id,
                data.flight_name,
                data.from_place,
                data.to_place,
                data.start_date_time,
                data.username,
                data.email,
                data.no_of_seats,
                data.passenger_details,
                data.meal,
                data.seat_numbers
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        );
    },
    bookingdetails:(data,callback) => {
        pool.query(
            `select * from booking where email =?`, [data.email], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    bookingdetailspnr:(pnr,callback) => {
        pool.query(
            `select * from booking where pnr =?`, [pnr], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    deletebooking:(pnr,callback) => {
        pool.query(
            `delete from booking where pnr =?` , [pnr],(error,results,fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results.affectedRows);
            }
        )
    },
    createuser: (data, callback) => {
        pool.query(
            `insert into user(userid,username,password,email_id) values(?,?,?,?)`,
            [
                data.user_id,
                data.user_name,
                data.password,
                data.email
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error)
                }
                return callback(null, results)

            }
        );
    },
    getByUserUsername: (username, callback) => {
        pool.query(
            `SELECT * FROM user WHERE username = ?`, [username], (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    }
}
