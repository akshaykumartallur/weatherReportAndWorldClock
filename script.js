const API_KEY = "6debee9bee63464cb89161605252405";
const weatherDiv = document.getElementById("weather");
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

async function fetchWeather(city) {
    try {
        weatherDiv.innerHTML = '<div class="loading">Loading weather data...</div>';
        
        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error("Error:", error);
        weatherDiv.innerHTML = `<div class="error">Failed to fetch weather data: ${error.message}</div>`;
    }
}

function displayWeather(data) {
    const { location, current } = data;
    const { temp_c, condition, humidity, wind_kph, feelslike_c } = current;
    
    weatherDiv.innerHTML = `
        <div class="weather-info">
            <div class="location">${location.name}, ${location.country}</div>
            <div class="temp">${temp_c}°C</div>
            <div class="description">${condition.text}</div>
            <img src="${condition.icon}" alt="${condition.text}" class="weather-icon">
            <div class="details">
                <div class="detail-item">
                    <span class="detail-value">${feelslike_c}°C</span>
                    <span class="detail-label">Feels Like</span>
                </div>
                <div class="detail-item">
                    <span class="detail-value">${humidity}%</span>
                    <span class="detail-label">Humidity</span>
                </div>
                <div class="detail-item">
                    <span class="detail-value">${wind_kph} km/h</span>
                    <span class="detail-label">Wind Speed</span>
                </div>
            </div>
        </div>
    `;
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    }
});

// Initial load
fetchWeather(cityInput.value);