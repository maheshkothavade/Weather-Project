//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const https=require("https");
const { REPL_MODE_STRICT } = require("repl");


app.get("/", function(req,res) 
{
    //    res.send("server is up and running"); 
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res)
{
    console.log(req.body);
    console.log("Post Recieved");
    var query=req.body.cityName;
    const apiKey='182f3690b07d046dd63f05d924d24f12';
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric";
    https.get(url,function(response)
    {
        console.log(response.statusCode);

        response.on("data",function(data)
        {
            const weatherData=JSON.parse(data);
            var temp=weatherData.main.temp
            var description=weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>Weather in "+query+" is "+description+"<\h1>");
            res.write("<h2>Current temperature is "+temp+"</h2>")
            res.write("<image src="+iconUrl+">");
            res.send();
            // console.log(weatherData);
        });
    });
});


app.listen(3000, function()
{
    console.log("Server running on port 3000");
});