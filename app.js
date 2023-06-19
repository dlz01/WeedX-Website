const express = require("express");
const app = express();
app.use(require("body-parser").urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(require('express-fileupload')());

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

let fileToTime = new Map; // key: filename, val: map(timestamp -> data)
let fileToCat = new Map; // key: filename, val: categories array
let func = "";

app.get("/", function (req, res) {
    let contents = [];
    let latlon = ["42.29671458723321", "-83.72128727212987"];
    if (fileToTime.has("IRT7.dat") && fileToTime.get("IRT7.dat").has("2023-05-31 00:15:00")) {
        let datas = fileToTime.get("IRT7.dat").get("2023-05-31 00:15:00");
        let cat = fileToCat.get("IRT7.dat").slice(1);
        for (i = 0; i < cat.length; i++) {
            contents.push(cat[i] + ": " + datas[i]);
        }
        let latIdx = cat.indexOf("Latitude");
        let lonIdx = cat.indexOf("Longitude");
        latlon = [datas[latIdx], datas[lonIdx]];
    }
    res.render("index", {contents: contents, latlon: latlon, func: func});
})
app.post('/upload', function(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        res.redirect("/")
    }

    let sampleFile = req.files.fileUploaded;
    let filename = sampleFile.name;
  
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(__dirname + '/uploads/' + filename, function(err) {
        if (err) {
            return res.status(500).send(err);
        } 
        if (!fileToTime.has(filename)) {
            fileToTime.set(filename, new Map);
        }
        let timeMap = fileToTime.get(filename); // key: timestamp, val: array of data
        var buffer = sampleFile.data;
        let content = buffer.toString('utf8');
        let lines = content.split("\n");
        if (!fileToCat.has(filename)) {
            fileToCat.set(filename, []);
            let cats = lines[1].split(",");
            for (i = 0; i < cats.length; i++) {
                fileToCat.get(filename).push(cats[i].replace(/"/g, ''));
            }
        }
        for (i = 4; i < lines.length; i++) {
            let line = lines[i].split(",");
            timeMap.set(line[0].replace(/"/g, ''), line.slice(1));
        }
        func = "plotChart();"
        res.redirect('/');
    });
  });

app.listen(6006, function() {
    console.log("server is hosting on port 6006");
})
