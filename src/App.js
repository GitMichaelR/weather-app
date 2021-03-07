import "./App.css";
import { useState, useEffect } from "react";

const api = {
  key: "8c1aa1fb9abfaf0c303ce10326395aa1",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("{}");
  const [iconUrl, setIconUrl] = useState("");

  useEffect(() => {
    getWeatherData("Stuttgart");
  }, []);

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let dateArr = String(d).split(" ");

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = dateArr[2];
    let year = dateArr[3];
    let time = dateArr[4].substring(0, 5);

    return `${day}, ${date} ${month} ${year}, ${time}`;
  };

  const getWeatherData = (query) => {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        console.log(result);
        setIconUrl(
          `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`
        );
      })
      .catch((error) => console.log(error));
  };

  const search = (evt) => {
    if (evt.key === "Enter") {
      getWeatherData(query);
    }
  };

  return (
    <div className="app">
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for a city ..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        ></input>
      </div>
      {typeof weather.main != "undefined" ? (
        <div>
          <div className="location-box">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              <p className="box">{Math.round(weather.main.temp)}°C</p>
              <div className="details">
                <p>Max: {weather.main.temp_max}°C</p>
                <p>Min: {weather.main.temp_min}°C</p>
                <p>Wind: {weather.wind.speed} m/s</p>
              </div>
            </div>
            <div className="weather">
              <img src={iconUrl} alt="weather icon" /> {weather.weather[0].main}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
