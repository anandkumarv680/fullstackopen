import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  useEffect(() => {
    if (filteredCountries.length === 1 && filteredCountries[0].capital) {
      const capital = filteredCountries[0].capital[0];

      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`,
        )
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setWeather(null);
    }
  }, [search, countries]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const showCountry = (country) => {
    setSearch(country.name.common);
  };

  return (
    <div>
      <p>
        find countries <input value={search} onChange={handleSearch} />
      </p>

      {filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {filteredCountries.length <= 10 &&
        filteredCountries.length > 1 &&
        filteredCountries.map((country) => (
          <p key={country.cca3}>
            {country.name.common}
            <button onClick={() => showCountry(country)}>show</button>
          </p>
        ))}

      {filteredCountries.length === 1 && (
        <div>
          <h1>{filteredCountries[0].name.common}</h1>

          <p>capital {filteredCountries[0].capital[0]}</p>

          <p>area {filteredCountries[0].area}</p>

          <h2>languages:</h2>

          <ul>
            {Object.values(filteredCountries[0].languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>

          <img
            src={filteredCountries[0].flags.png}
            alt={`flag of ${filteredCountries[0].name.common}`}
            width="150"
          />
        </div>
      )}
      {filteredCountries.length === 1 && weather && (
        <div>
          <h2>Weather in {filteredCountries[0].capital[0]}</h2>

          <p>temperature {weather.main.temp} Celsius</p>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />

          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;
