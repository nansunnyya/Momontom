const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector("h4");

const USER_ID = "currentUser",
  SHOW_CK = "showing";

function handleName(e) {
  e.preventDefault();
  const currentValue = input.value;
  console.log(currentValue);
  paintGreeting(currentValue);
  localStorage.setItem(USER_ID, currentValue);
}
function addName() {
  form.classList.add(SHOW_CK);
  form.addEventListener("submit", handleName);
}
function paintGreeting(userName) {
  greeting.classList.add(SHOW_CK);
  form.classList.remove(SHOW_CK);
  greeting.innerHTML = `hello, ${userName}`;
}

function deleteSpell() {
  input.value = "";
}
function init() {
  userName = localStorage.getItem(USER_ID);
  console.log(userName);
  if (userName === null) {
    addName();
  } else {
    paintGreeting(userName);
  }
  input.addEventListener("blur", deleteSpell);
}
init();
