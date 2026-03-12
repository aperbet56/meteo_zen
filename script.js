// Récupération des éléments HTML5
const bodyItem = document.querySelector("body");
const buttonItem = document.querySelector("#search__btn");
const inputItem = document.querySelector("#city__input");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const cardTitle = document.querySelector(".card__title");
const cityItem = document.querySelector(".city");
const cardWeather = document.querySelector(".card__weather");
const humidityItem = document.querySelector(".humidity");
const windItem = document.querySelector(".wind");
const footerYear = document.querySelector(".footer__text__year");

// API KEY
const apiKey = "6529bbf8a404d9dc7494e5331f646f82"; // ⚠️ A ne pas exposer publiquement normalement !

// Variable permettant de stocker dans un tableau les données renvoyées par l'API Openweathermap
let currentWeather = [];

// Déclaration de la fonction asynchrone displayWeather qui va permettre de récupérer et d'afficher les données de l'API
const displayWeather = async (city) => {
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${apiKey}`
  )
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      // Affichage d'un message de réussite de la requête dans la console
      console.log("✅ Requête réussie");
      currentWeather = value;
      console.log(currentWeather);

      // Récupération des données de la ville saisie par l'internaute
      let temperature = Math.round(currentWeather.main.temp);
      let wind = currentWeather.wind.speed;
      let humidity = currentWeather.main.humidity;
      let description = currentWeather.weather[0].description;
      let icon = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`;
      let weatherMain = currentWeather.weather[0].main.toLowerCase();
      // Ex: "clear", "clouds", "rain"

      // Choix du fond d'écran en fonction de la météo
      let weatherBackgrounds = {
        clear: "url('img/clear.webp')",
        clouds: "url('img/cloudy.webp')",
        rain: "url('img/rain.webp')",
        thunderstorm: "url('img/thunder.webp')",
        snow: "url('img/snow.webp')",
        mist: "url('img/mist.webp')",
        haze: "url('img/haze.webp')",
      };

      // Si la météo n’est pas reconnue, on utilise un fond par défaut
      let backgroundImage =
        weatherBackgrounds[weatherMain] || "url('img/background-meteo.jpg')";

      // Mise à jour de la ville et du background-image
      bodyItem.style.backgroundImage = backgroundImage;
      cityItem.textContent = currentWeather.name;

      // Mise à jour de la température, de la description du temps et de l'icone
      cardWeather.innerHTML = `
        <div class="card__weather__content">
          <h2 class="display1">${temperature}°C</h2>
          <p style="text-transform: capitalize;">${description}</p>
        </div>
        <div class="card__weather__img">
          <img src="${icon}" alt="Météo" />
        </div>
      `;

      // Mise à jour de l'humidité et du vent
      humidityItem.textContent = `${humidity}%`;
      windItem.textContent = `${wind}`;
    })
    .catch(function (err) {
      // Affichage d'un message d'erreur dans la console
      console.error("❌ Erreur :", err);
    });
};

// Ecoute de l'événement "click" sur le bouton rechercher (icône de la loupe)
buttonItem.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputItem.value == "") {
    alert("Veuillez saisir le nom d'une ville");
  } else {
    // Appel de la fonction displayWeather ayant pour paramètre la nouvelle valeur de l'input
    displayWeather(inputItem.value);
  }
});

// Appel de la fonction displayWeather ayant pour paramètre la ville de Araules pour avoir les données de cette ville dès l'arrivée sur la page
displayWeather("Araules");

// Déclaration de la fonction displayDateAndTime() qui va permettre l'affichage de la date et de l'heure
const displayDateAndTime = () => {
  // Déclaration des différentes variables utilisées pour l'affichage de l'heure
  let today = "";
  let year = "";
  let monthsList = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];
  let month = "";

  //Attention la semaine commence un dimanche en Javascript
  let daysList = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  let dayNumber = "";
  let dayName = "";
  let hours = "";
  let minutes = "";
  let twoNumberDisplay = "";

  // Récupération de la date actuelle
  today = new Date();

  // Récupération de l'année en cours
  year = today.getFullYear();

  // Récupération du mois en cours
  month = monthsList[today.getMonth()];

  // Récupération du noméro  du jour
  dayNumber = today.getDate();

  // Récupération du jour en cours
  dayName = daysList[today.getDay()];

  // affichage d'un zéro devant un nombre/chiffre
  twoNumberDisplay = (item) => {
    if (item < 10) {
      return (item = "0" + item);
    } else {
      return item;
    }
  };

  // Récupéreation de l'heure :
  hours = twoNumberDisplay(today.getHours());

  // Récupéreration des minutes :
  minutes = twoNumberDisplay(today.getMinutes());

  //Affichage des éléments dans le DOM :
  date.textContent = dayName + " " + dayNumber + " " + month + " " + year;
  time.textContent = hours + ":" + minutes;

  // Lancer la fonction displayDateAndTime toutes les 1000 ms, soit toute les secondes pour afficher l'heure en temps réel:
  setTimeout(displayDateAndTime, 1000);

  footerYear.textContent = `${year}`;
};

// Appel de la fonction displayDateAndTime()
displayDateAndTime();
