const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const winston = require("winston");

const app = express();
app.use(cors()); 
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
    res.set({
        "Content-Security-Policy": "script-src 'self' 'https://apis.google.com'"
    });
    
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