const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const winston = require("winston");

const app = express();

const whitelist = ["https://j-pcgoncalves.github.io"];
const corsOptions = {
    origin: function (origin, callback) {
        if(whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
};

app.use(cors(corsOptions)); 
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
}) 

app.post("/secret", (req, res) => {
    const { userInput } = req.body;
    console.log(userInput);

    if(userInput) {
        winston.log("info", "user input: " + userInput);
        res.status(200).json("success");
    } else {
        winston.error("This guy is messing with us: " + userInput);
        res.status(400).json("incorrect submission");
    }
})

app.listen(3000, () => console.log("Example app listening on port 3000!"));