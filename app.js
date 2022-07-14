const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express()

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html")
    // res.send("Server is up and running.")
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "83da05372c8965aad9596538ce176806";
    const unit = "imperial"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;
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
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Fahrenheit</h1>");
            res.write("<h2>The weather is currently " + weatherDescription + " .</h2>"); 
           res.write("<img src=" + iconUrl + ">");
            res.send();  
        })
    
    });

});




app.listen(3000, function () {
    console.log("Server is running on port 3000.")
});


// open weather api keys
// 660cf05e49e3e7b6b0a72b5524759c6c
// 83da05372c8965aad9596538ce176806

//weatherapi key
// fdcf69928b5b4aa0976194003221207