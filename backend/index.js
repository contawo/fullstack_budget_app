const express = require("express")
const mongoose = require("mongoose");

// Routes
const users = require("./routes/users")

require("dotenv").config()

const app = express();
PORT = process.env.PORT;
  
mongoose.connect(`${process.env.DATABASE_CONNECT}`)
    .then(() => console.log("Connected to database"))
    .catch((error) => console.error(error));

app.use(express.json())
app.use("/users", users)

app.listen(PORT, () => {
    console.log("App running at PORT:", PORT)
}) 