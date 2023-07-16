import React, { useState } from "react";
import "./app.css";

const App = () => {
  const key = "177f9bb9efb8cddb4aa7a3ae99d7713a";
  const [search, setSearch] = useState("");
  const [result, setResult] = useState({});
  const [name, setName] = useState("");
  const [temp, setTemp] = useState(0);
  const [main, setMain] = useState("");
  // eslint-disable-next-line
  const [des, setDes] = useState("");
  const [Err, setErr] = useState(null);
  const [isloading, setLoading] = useState(null);
  const [text, setText] = useState(null);
  const date = new Date();
  const inputHandle = (e) => {
    setSearch(e.target.value);
    setText(null);
  };
  const searchHandle = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}`
      );
      const jsonResponse = await response.json();
      setResult(jsonResponse);
      setName(jsonResponse.name);
      setText(jsonResponse.name);
      setTemp((jsonResponse.main.temp - 273.15).toFixed(2));
      setMain(jsonResponse.weather[0].main);
      setDes(jsonResponse.weather[0].description);
      setErr(null);
      setText("");
    } catch (err) {
      setErr(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={
        main === "Clouds"
          ? "clouds"
          : main === "Clear"
          ? "clear"
          : main === "Haze"
          ? "haze"
          : main === "Rain"
          ? "rain"
          : main === "Snow"
          ? "snow"
          : main === "Wind"
          ? "wind"
          : "default"
      }
      id="container"
    >
      <div className="header">
        <input
          type="text"
          placeholder="Enter your Location.."
          onChange={inputHandle}
          value={text}
        />
        <button type="button" onClick={searchHandle}>
          Search
        </button>
      </div>
      <div className="content">
        <h2 className="p">Weather App</h2>
        {isloading ? (
          <span>loading....</span>
        ) : (
          <div className="report">
            {Err !== null ? (
              <span>Data is Not Recived..</span>
            ) : (
              <div className="list">
                {typeof result.main !== "undefined" ? (
                  <div className="items">
                    <p>
                      <i className="fa-solid fa-location-crosshairs"></i>
                      {name}
                    </p>
                    <p>
                      <i className="fa-solid fa-temperature-three-quarters"></i>
                      {temp}°C
                    </p>
                    <p>
                      <i
                        className={
                          main === "Clouds"
                            ? " fa-solid fa-cloud"
                            : main === "Clear"
                            ? "fa-solid fa-sun"
                            : main === "Haze"
                            ? "fa-solid fa-smog"
                            : main === "Rain"
                            ? "fa-solid fa-cloud-rain"
                            : main === "Snow"
                            ? "fa-solid fa-snowflake"
                            : main === "Wind"
                            ? "fa-solid fa-wind"
                            : null
                        }
                      ></i>
                      {main}
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}
      </div>
      <p id="p">{date.toLocaleDateString()}</p>
    </div>
  );
};

export default App;
