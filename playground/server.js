const express = require("express");
const app = express();

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.listen(6006, function (){
    console.log("server listening on localhost 6006");
})