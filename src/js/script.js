const liegeLat = 50.8503;
const liegeLon = 5.56749;
const apiKey = '932e0107ba69627a8988672d52d0fd81';
const weatherUrl =`https://api.openweathermap.org/data/2.5/meteo?q=Liege,be&lat=${liegeLat}&lon=${liegeLon}&appid=${apiKey}&units=metric`;
const weatherOuput = document.getElementById('weather-ouput');

fetch(weatherUrl)
  .then(response => response.json())
  .then(data => {
    let weatherData = data;
    console.log(weatherData);
  })
  .catch(error => {
    console.error('Erreur :', error);
  });