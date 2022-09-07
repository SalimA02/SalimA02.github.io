
let weather = {
    apiKey: "e8e36405308f9d48ccc7acd0a02b7f1d",
    fetchWeather: function (city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.apiKey
        )   
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },

    displayWeather: function(data){

        const { name } = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;

        console.log(name,icon,description,temp,humidity,speed)

        document.querySelector(".city").innerText = "Weather in " + name ;

        document.querySelector(".icon").src = 
        "http://openweathermap.org/img/wn/"+icon+".png";

        document.querySelector(".description").innerText = description;

        document.querySelector(".temp").innerText = temp  + "°C";

        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = " Wind Speed of " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name +"')";
        
    },

    

    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }

};

document.
    querySelector(".search button").
    addEventListener("click", function(){
        weather.search(),
        document.getElementById('clear').value = '';
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function(event){
        if (event.key == "Enter"){
            weather.search(),
            document.getElementById('clear').value = '';
            
        }
});

 weather.fetchWeather("London")

// weather.fetchWeather("Tokyo")