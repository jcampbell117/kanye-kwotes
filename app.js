const express = require("express");
const https = require("https");
const ejs = require("ejs");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req, res) {

  const url = "https://api.kanye.rest";
  const options = {
    method: "get"
  };
  const request = https.request(url, options, function(response) {

    if(response.statusCode === 200) {
      console.log("ok");
    } else {
      console.log("not ok");
    }

    response.on("data", function(data) {
      const kwote = JSON.parse(data);
      res.render("home", {kwote: kwote.quote});
    })
  })
  request.end();
})

app.listen(process.env.PORT || 3000, function(req, res) {
  console.log("Listening on port 3000");
})
