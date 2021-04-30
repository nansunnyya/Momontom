
const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const currDate = new Date();
    const currHour = currDate.getHours();
    const currMin = currDate.getMinutes();
    const currSec = currDate.getSeconds();
    // console.log(currDate, currHour);
    const setDate = `${
        currHour <10? "0"+currHour : currHour} : ${
        currMin <10? "0"+currMin : currMin} : ${
        currSec <10? "0"+currSec : currSec}`;
    clockTitle.innerHTML = setDate;
    

}
function init(){
    getTime();
    setInterval(getTime,1000);
}
init();
