const liegeLat = 50.8503;
const liegeLon = 5.56749;
const apiKey = '665f646540393a8ed9f45524e6516b72';
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Liege,be&appid=${apiKey}&units=metric`;

fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
        const template = document.querySelector('#weather-template');
        const card = document.querySelector('.card');

        data.list.forEach(item => {
            const description = item.weather[0].description.toLowerCase();
            const tempMin = item.main.temp_min;
            const tempMax = item.main.temp_max;
            const date = new Date(item.dt * 1000); // Convertit le timestamp en date
            const options = { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                hour: 'numeric', 
                minute: 'numeric',
                hour12: false
            };
            const formattedDate = date.toLocaleDateString('fr-FR', options);
            const windSpeed = item.wind.speed;

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

            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card-data');
            cardDiv.appendChild(template.content.cloneNode(true));
            card.appendChild(cardDiv);

            const iconCode = item.weather[0].icon;

            const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

            const iconImg = document.createElement('img');
            iconImg.src = iconUrl;
            iconImg.alt = 'Weather Icon';

            const cardData = document.querySelector('.card-data');
            cardData.insertBefore(iconImg, cardData.firstChild);
        });
        
        forecastContainer.appendChild(card);


    })
    .catch(error => {
        console.error('Erreur :', error);
    });
