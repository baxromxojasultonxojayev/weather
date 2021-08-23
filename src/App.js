import React, {useState} from "react";
const api = {
  key: "af6ccddfe6dab477789f2a37b057780b",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

const App = () => {


  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = (e) => {
    if(e.key === 'Enter'){
      fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        })

    }
  }

  const dateBuilder = (s) => {
    let months = [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avgust",
      "Sentabr",
      "Oktabr",
      "Noyabr",
      "Dekabr",
    ];
    let days = [
      "Dushanba",
      "Seshanba",
      "Chorshanba",
      "Juma",
      "Payshanba",
      "Shanba",
      "Yakshanba",
    ];

    let day = days[s.getDay()];
    let date = s.getDate()
    let month = months[s.getMonth()]
    let year = s.getFullYear()

    return `${day}, ${date}, ${month}, ${year}`
  };

  return (
    <div className={(
      (typeof weather.main != 'undefined') ? 
         (weather.main.temp > 16) ? 
          'app' : 'app cold'
            : 'app ')  }>
      <main>
        <div className="search-box">
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search} />
        </div>
        {typeof weather.main != 'undefined' ?(
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
            <div className='weather-app'>
              <div className='temp'>{Math.round(weather.main.temp)}°C</div>
              <div className='weather'>{weather.weather[0].main}</div>

            </div>
          </div>
         ): (
           ''
         )}
      </main>
    </div>
  );
};

App.propTypes = {};

export default App;
