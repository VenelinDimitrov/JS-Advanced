function attachEvents() {
    const submitBtn = document.getElementById('submit');
    const location = document.getElementById('location');
    const forecastSection = document.getElementById('forecast');
    const currentSection = document.getElementById('current');
    const upcomingSection = document.getElementById('upcoming');

    submitBtn.addEventListener('click', getWeather);

    async function getWeather() {
        currentSection.innerHTML = '';
        upcomingSection.innerHTML = '';


        let url = 'http://localhost:3030/jsonstore/forecaster/locations';

        try {
            const response = await fetch(url);
            const data = await response.json();

            const neededLocation = data.find(c => c.name == location.value).code;

            let currentWeather = 'http://localhost:3030/jsonstore/forecaster/today/' + neededLocation;
            let threeDayForecast = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + neededLocation;

            let [currentWeatherResponse, forecastResponse] = await Promise.all([
                fetch(currentWeather),
                fetch(threeDayForecast),
            ]);

            const currentWeatherData = await currentWeatherResponse.json();
            const forecastData = await forecastResponse.json();

            displayCurrentWeather(currentWeatherData);
            displayForecast(forecastData);
        } catch (err) {
            forecastSection.style.display = "block";
            forecastSection.innerHTML = 'Error';
        }
    }



    const conditions = {
        'Sunny': '&#x2600',
        'Partly sunny': '&#x26C5',
        'Overcast': '&#x2601',
        'Rain': '&#x2614',
        'Degrees': '&#176'
    }

    function displayCurrentWeather(currentWeatherData) {
        forecastSection.style.display = "block";

        let forecastsDiv = document.createElement('div');
        forecastsDiv.className = "forecasts";


        let symbolSpan = document.createElement('span');
        symbolSpan.className = "condition symbol";
        symbolSpan.innerHTML = conditions[currentWeatherData.forecast.condition];

        let conditionSpan = document.createElement('span');
        conditionSpan.className = "condition";

        let citySpan = document.createElement('span');
        citySpan.className = "forecast-data";
        citySpan.textContent = currentWeatherData.name;

        let degreesSpan = document.createElement('span');
        degreesSpan.className = "forecast-data";
        degreesSpan.innerHTML = `${currentWeatherData.forecast.low}${conditions.Degrees}/${currentWeatherData.forecast.high}${conditions.Degrees}`;

        let weatherSpan = document.createElement('span');
        weatherSpan.className = "forecast-data";
        weatherSpan.textContent = currentWeatherData.forecast.condition;

        conditionSpan.appendChild(citySpan);
        conditionSpan.appendChild(degreesSpan);
        conditionSpan.appendChild(weatherSpan);

        forecastsDiv.appendChild(symbolSpan);
        forecastsDiv.appendChild(conditionSpan);

        currentSection.appendChild(forecastsDiv);
        console.log(currentSection);
    }

    function displayForecast(forecast) {
        let infoDiv = document.createElement('div');
        infoDiv.classList = "forecast-info";

        forecast.forecast.forEach(f => {
            let upcomingSpan = document.createElement('span');
            upcomingSpan.className = "upcoming";

            let symbolSpan = document.createElement('span');
            symbolSpan.innerHTML = conditions[f.condition];
            symbolSpan.className = "symbol";

            let degreesSpan = document.createElement('span');
            degreesSpan.className = "forecast-data";
            degreesSpan.innerHTML = `${f.low}${conditions.Degrees}/${f.high}${conditions.Degrees}`;

            let weatherSpan = document.createElement('span');
            weatherSpan.className = "forecast-data";
            weatherSpan.textContent = f.condition;

            upcomingSpan.appendChild(symbolSpan);
            upcomingSpan.appendChild(degreesSpan);
            upcomingSpan.appendChild(weatherSpan);

            infoDiv.appendChild(upcomingSpan);
        });

        upcomingSection.appendChild(infoDiv);
    }
}

attachEvents();