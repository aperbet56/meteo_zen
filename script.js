// Récupération des éléments HTML5
const bodyItem = document.querySelector("body");
const buttonItem = document.querySelector("#search__btn");
const inputItem = document.querySelector("#city__input");
const date = document.querySelector(".date");
const time = document.querySelector(".time");
const cardTitle = document.querySelector(".card__title");
const cardWeather = document.querySelector(".card__weather");
const humidityItem = document.querySelector(".card__humidity");
const windItem = document.querySelector(".card__wind");
const footerYear = document.querySelector(".footer__text__year");

// fonction affichage du jour et l'heure
const displayDateTime = () => {
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

  // Lancer la fonction displayDateTime toutes les 1000 ms, soit toute les secondes pour afficher l'heure en temps réel:
  setTimeout(displayDateTime, 1000);

  footerYear.textContent = `${year}`;
};

// Appel de la fonction displayDateTime
displayDateTime();
