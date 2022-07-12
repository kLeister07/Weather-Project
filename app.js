const express = require("express");
const https = require("https");

const app = express()

app.get("/", function (req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=san antonio&units=imperial&appid=83da05372c8965aad9596538ce176806"
    https.get(url, function (response) {
        console.log(response.statusCode);
        
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            console.log(temp);
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl ="http://openweathermap.org/img/wn/" + icon + "@2x.png";

            console.log(icon);

            console.log(weatherDescription);
            // res.send("The temperature in San Antonio is " + temp + " degrees Fahrenheit");
            res.write("<h1>The temperature in San Antonio is " + temp + " degrees Fahrenheit</h1>");
            res.write("<h2>The weather is currently " + weatherDescription + " .</h2>"); 
           res.write("<img src=" + iconUrl + ">");
            res.send();  
        })

    });
    // res.send("Server is up and running.")
});





app.listen(3000, function () {
    console.log("Server is running on port 3000.")
});