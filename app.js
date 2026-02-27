// Your OpenWeatherMap API Key
const API_KEY = '475e3ee33a5099d1cc9c6fc52ff7cb03';  // Replace with your actual API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather(city) {

    showLoading();

    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;

    // 🔒 Disable button while searching
    searchBtn.disabled = true;
    searchBtn.textContent = "Searching...";

    try {
        const response = await axios.get(url);
        displayWeather(response.data);

    } catch (error) {

        if (error.response && error.response.status === 404) {
            showError("City not found. Please check the spelling and try again.");
        } else {
            showError("Something went wrong. Please try again later.");
        }

    } finally {
        // 🔓 Re-enable button after request completes
        searchBtn.disabled = false;
        searchBtn.textContent = "Search";
    }
}

// Function to display weather data
function displayWeather(data) {
    // Extract the data we need
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    
    // Create HTML to display
    const weatherHTML = `
        <div class="weather-info">
            <h2 class="city-name">${cityName}</h2>
            <img src="${iconUrl}" alt="${description}" class="weather-icon">
            <div class="temperature">${temperature}°C</div>
            <p class="description">${description}</p>
        </div>
    `;
    
    // Put it on the page
    document.getElementById('weather-display').innerHTML = weatherHTML;
}

// Call the function when page loads
// getWeather('London');

function showError(message) {

    const errorHTML = `
        <div class="error-message">
            <h3>⚠️ Oops!</h3>
            <p>${message}</p>
        </div>
    `;

    // Display inside weather container
    document.getElementById("weather-display").innerHTML = errorHTML;
}

// Get references to HTML elements
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

// Common function to handle search
function handleSearch() {
    // 1️⃣ Get value
    let city = cityInput.value;

    // 2️⃣ Trim whitespace
    city = city.trim();

    // 3️⃣ Validate input
    if (city === "") {
        showError("⚠️ Please enter a city name.");
        return;
    }

    // 4️⃣ Call weather function
    getWeather(city);

    // 5️⃣ Clear input field (optional UX improvement)
    cityInput.value = "";
}

// Click event listener
searchBtn.addEventListener("click", handleSearch);

// Enter key support
cityInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        handleSearch();
    }
});

// Function to show welcome message
function showWelcome() {
    const welcomeHTML = `
        <div class="welcome-message">
            <h2>🌤 Welcome to SkyFetch</h2>
            <p>Enter a city name above to check the latest weather updates.</p>
        </div>
    `;

    document.getElementById("weather-display").innerHTML = welcomeHTML;
}

// Call it when page loads
showWelcome();

// Show loading state
function showLoading() {

    const loadingHTML = `
        <div class="loading-container">
            <div class="spinner"></div>
            <p>Loading weather data...</p>
        </div>
    `;

    document.getElementById("weather-display").innerHTML = loadingHTML;
}
showLoading();


searchBtn.addEventListener('click', function () {

    const city = cityInput.value.trim();

    // 1️⃣ Check if empty OR only spaces
    if (!city) {
        showError("Please enter a city name.");
        return;
    }

    // 2️⃣ Minimum length validation
    if (city.length < 2) {
        showError("City name too short. Please enter at least 2 characters.");
        return;
    }

    // 3️⃣ Optional: Allow only letters and spaces (better UX)
    const validCityPattern = /^[a-zA-Z\s]+$/;

    if (!validCityPattern.test(city)) {
        showError("City name should contain only letters.");
        return;
    }

    // ✅ If all validations pass
    getWeather(city);
});

cityInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});

function displayWeather(data) {

    // Example weather display (keep your existing code here)
    document.getElementById('weather-display').innerHTML = `
        <div class="weather-card">
            <h2>${data.name}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
        </div>
    `;

    // 🎯 Focus back to input field
    cityInput.focus();

    // Optional: Select text for faster re-typing
    cityInput.select();
}