const express = require("express");
require("dotenv").config();
const dbConnection = require("./config/db");
const router = require("./routes");

const app = express();

//middleware
app.use(express.json());
dbConnection();
//Routes

app.use("/api", router)


//Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT} PORT`)
})