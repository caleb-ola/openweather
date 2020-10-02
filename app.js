//jshint esversion:6

require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");


const app = express();
app.use(bodyParser.urlencoded({extended : true}));



app.get("/",(req,res) => {

    res.sendFile(__dirname + "/index.html"); 

    
});

app.post("/", (req,res) =>{

    //console.log(req.body.cityName);

    query = req.body.cityName;
    id = process.env.ID;
    const url ="https://api.openweathermap.org/data/2.5/weather?&q=" + query + "&appid="+ id +"&units=metric" ;
    https.get(url,(response) => {
       // console.log(response.statusCode);
       response.on("data",(data) => {
        const weatherData = JSON.parse(data);
        //console.log(weatherData);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        //console.log(description);
        const icon = weatherData.weather[0].icon;
        const imgURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";

        res.write("<h1>The temprature in " + query +  " is " + temp + " degree celcius</h1>");
        res.write("<p>The weather currently is " + description + "</p>");
        res.write("<img src = " + imgURL + ">");
        res.send();
       });
    });
});


app.listen(3000, () =>{
    console.log("listening @ port 3000");
});