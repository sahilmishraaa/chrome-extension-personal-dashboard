const defaultImg = "https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?crop=entropy&c…d=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODIzMjU1NTV8&ixlib=rb-4.1.0&q=85";
const authorName = document.getElementById("author");
const cryptoCurrency = document.getElementById("crypto");
const currentTime = document.getElementById("current-time");
const weather = document.getElementById("weather");

setInterval(() => {
    const date = new Date();
    const time = date.toLocaleTimeString("en-us", { timeStyle: "short" });
    currentTime.innerText = time;
}, 1000);

navigator.geolocation.getCurrentPosition(async position => {
    try{
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const response = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`,)
        if (!response.ok) {
            throw new Error("Failed to fetch weather data")
        }
        const data = await response.json()
        weather.innerHTML = `<div class="weather-box">
                <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
                <p class="temp">${Math.round(data.main.temp)}°C</p>
                <p class="city">${data.name}</p>
            </div>`;
    } catch(err){
        console.log(err)
    }
})

try{
    const response = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=mountain",)
    if (!response.ok) {
        throw new Error("Failed to fetch background Image")
    }
    const data = await response.json()
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    authorName.textContent = data.user.name;
} catch(err){
    authorName.textContent = "Anonymous";
    document.body.style.backgroundImage = `url(${defaultImg})`;
}

try{
    const response = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    if (!response.ok) {
        throw new Error("Failed to fetch Bitocoin Data")
    }
    const data = await response.json()
    cryptoCurrency.innerHTML = `<div class = "crypto-class">
        <p>${data.name}</p>
        <img src="${data.image.small}" alt="Dogecoin Logo"></img>
        </div>
        <p>◉ - ₹ ${data.market_data.current_price.inr}</p>
        <p>▲ - ₹ ${data.market_data.high_24h.inr}</p>
        <p>▼ - ₹ ${data.market_data.low_24h.inr}</p>`;
} catch(err){
    console.error(err)
}
