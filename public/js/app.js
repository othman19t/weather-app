const weatherForm = document.querySelector("form");
const address = document.querySelector(".input");
const error = document.querySelector(".error");
const mes = document.querySelector(".mes");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  mes.innerHTML = "loading...";
  const location = address.value;
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        error.innerHTML = data.error;
        mes.innerHTML = "";
      } else {
        mes.innerHTML = data.forecast;
        error.innerHTML = "";
      }
    });
  });
});
