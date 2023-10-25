const liegeLat = 50.8503;
const liegeLon = 5.56749;
const apiKey = '665f646540393a8ed9f45524e6516b72';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Liege,be&appid=${apiKey}&units=metric`;

fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
        const description = data.weather[0].description.toLowerCase();
        const tempMin = data.main.temp_min;
        const tempMax = data.main.temp_max;
        const date = new Date(data.dt * 1000); // Convertit le timestamp en date
        const options = { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            hour: 'numeric', 
            minute: 'numeric',
            hour12: false
        };
        const formattedDate = date.toLocaleDateString('fr-FR', options);
        const windSpeed = data.wind.speed;

        const template = document.querySelector('#weather-template');
        const ul = template.content.querySelector('ul');
        const li = document.createElement('li');

        li.innerHTML = `
        ${formattedDate}<br>
        Description : ${description}<br>
        Temp Mini : ${tempMin}°C<br>
        Temp Max : ${tempMax}°C<br>
        Vitesse du Vent : ${windSpeed.toFixed(2)} km/s
        `;

        ul.appendChild(li);

        const card = document.querySelector('.card');
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card-data');
        cardDiv.appendChild(template.content.cloneNode(true));
        card.appendChild(cardDiv);

        const iconCode = data.weather[0].icon;


        const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;


        const iconImg = document.createElement('img');
        iconImg.src = iconUrl;
        iconImg.alt = 'Weather Icon';


        const cardData = document.querySelector('.card-data');
        cardData.insertBefore(iconImg, cardData.firstChild);

   
    })

    .catch(error => {
        console.error('Erreur :', error);
    });
