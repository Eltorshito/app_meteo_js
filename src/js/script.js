const liegeLat = 50.8503;
const liegeLon = 5.56749;
const apiKey = '665f646540393a8ed9f45524e6516b72';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Liege,be&appid=${apiKey}&units=metric`;

fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
        const description = data.weather[0].description;
        const tempMin = data.main.temp_min;
        const tempMax = data.main.temp_max;
        const date = new Date(data.dt * 1000); // Convertit le timestamp en date
        const windSpeed = data.wind.speed;

        const template = document.querySelector('#weather-template');
        const ul = template.content.querySelector('ul');
        const li = document.createElement('li');

        li.innerHTML = `
        ${date}<br>
        Description : ${description}<br>
        Temp Mini : ${tempMin}°C<br>
        Temp Max : ${tempMax}°C<br>
        Vitesse du Vent : ${windSpeed} m/s
        `;

        ul.appendChild(li);

        const card = document.querySelector('.card');
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card-data');
        cardDiv.appendChild(template.content.cloneNode(true));
        card.appendChild(cardDiv);

        // Récupère le code d'icône depuis la réponse de l'API
        const iconCode = data.weather[0].icon;

        // Construis l'URL de l'icône en fonction du code
        const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

        // Crée un élément img avec la source de l'icône
        const iconImg = document.createElement('img');
        iconImg.src = iconUrl;
        iconImg.alt = 'Weather Icon';

        // Insère l'icône dans la carte
        const cardData = document.querySelector('.card-data');
        cardData.insertBefore(iconImg, cardData.firstChild);

    })

    .catch(error => {
        console.error('Erreur :', error);
    });
