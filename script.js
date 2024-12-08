const apiKey = "4425b3080ea64965af422941241711";
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');

const cityElement = document.getElementById('city');
const countryElement = document.getElementById('country');
const temperatureElement = document.getElementById('temperature');
const conditionElement = document.getElementById('condition');
const weatherIconElement = document.getElementById('weather-icon');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');

async function getWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
        );
        const data = await response.json();
        
        if (response.ok) {
            updateWeatherInfo(data);
        } else {
            alert('도시를 찾을 수 없습니다. 다시 시도해주세요.');
        }
    } catch (error) {
        console.error('에러 발생:', error);
        alert('날씨 정보를 가져오는데 실패했습니다.');
    }
}

function updateWeatherInfo(data) {
    cityElement.textContent = data.location.name;
    countryElement.textContent = data.location.country;
    temperatureElement.textContent = `${Math.round(data.current.temp_c)}°C`;
    conditionElement.textContent = data.current.condition.text;
    weatherIconElement.src = `https:${data.current.condition.icon}`;
    humidityElement.textContent = `${data.current.humidity}%`;
    windElement.textContent = `${data.current.wind_kph} km/h`;
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    }
});

// 기본적으로 서울의 날씨 표시
getWeatherData('Seoul');
