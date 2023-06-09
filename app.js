const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(fileUpload());

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

app.get("/", function (req, res) {
    res.render("index");
})
app.post('/upload', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

    let sampleFile = req.files.fileUploaded;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(__dirname + '/uploads/' + sampleFile.name, function(err) {
        if (err) {
            return res.status(500).send(err);
        } 
        var buffer = sampleFile.data;
        console.log(buffer.toString('utf8'));
        res.redirect('/');
    });
  });

app.listen(6006, function() {
    console.log("server is hosting on port 6006");
})