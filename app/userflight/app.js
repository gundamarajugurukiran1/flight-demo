require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require("./user.router");



app.use(express.json());
app.use("/app/userflight" , userRouter);

app.listen(process.env.APP_PORT , () => {
    console.log("server is up and running");
})