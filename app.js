const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "-"; //you can use your own API Key by register in https://openweathermap.org/
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const iconID = weatherData.weather[0].icon;
      const image = "http://openweathermap.org/img/wn/" + iconID + "@2x.png";
      res.write("<p> The Weather Is Currently " + desc + "</p>");
      res.write("<h1> The temperatur in " + query + " is " + temp + "</h1>");
      res.write("<img src=" + image + ">");
    });
  });
});
app.listen(3000, (req, res) => {
  console.log("run in 3000 server");
});
