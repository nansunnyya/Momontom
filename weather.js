const weather = document.querySelector(".js-weather");
const COORDS = "coords";

function getAPI(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dae78c73acff65910e9f5e63983c838a&units=metric`
  )
    .then(function (response) {
      return response.json();
      //json()은 Response 스트림을 가져와 스트림이 완료될때까지 읽는다. (promise반환)
    })
    .then(function (json) {
      const temperature = Math.round(json.main.temp);
      const statusIcon = json.weather[0].icon;
      const status = json.weather[0].description;
      weather.innerHTML = `${status} ${temperature}º`;
      //<img src="http://openweathermap.org/img/wn/${statusIcon}@2x.png" />
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGeoSucess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = { latitude, longitude };
  saveCoords(coordsObj);
  getAPI(latitude, longitude);
}
function handleGeoError() {
  console.log("can't access");
}
function askForCoords() {
  //장치의 현재위치를 가져옴
  navigator.geolocation.getCurrentPosition(handleGeoSucess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getAPI(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}
init();
