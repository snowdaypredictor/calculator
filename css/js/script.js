document.getElementById("weatherForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const locationInput = document.getElementById("locationInput").value.trim();
    if (locationInput) {
        await getWeather(locationInput);
    } else {
        alert("Please enter a valid location.");
    }
});

async function getWeather(location) {
    const apiKey = '425e41d509acb59d13323baa9f8d4db8';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.cod === "404") {
            document.getElementById("weatherResult").innerHTML = "<p class='error-message'>Location not found.</p>";
            return;
        }
        const forecast = data.list.map(item => ({
            date: new Date(item.dt * 1000),
            weather: item.weather[0].main.toLowerCase(),
        }));
        const snowCount = forecast.filter(item => item.weather.includes("snow")).length;
        const snowDayChances = (snowCount / forecast.length) * 100;
        const snowDayMessage = `Snow Day Chances: ${snowDayChances.toFixed(2)}%`;
        document.getElementById("weatherResult").innerHTML = `<p>${snowDayMessage}</p>`;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("weatherResult").innerHTML = "<p class='error-message'>Failed to fetch weather data. Please try again later.</p>";
    }
}
