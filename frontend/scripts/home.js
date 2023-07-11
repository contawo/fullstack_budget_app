import Database from "../utils/database.js";

const errorBanner = document.querySelector(".main_auth_error")
const greetText = document.querySelector(".main_banner_header_text")
const getCanvas = document.querySelector(".main_spendings_container_data")

const userID = JSON.parse(localStorage.getItem("userID"));
const database = new Database("http://localhost:8000")
database.fetchData(`users/${userID}`).then(res => {
    if (res?.message === "Could not find user") {
        errorBanner.style.display = "flex"
        greetText.innerText = "Welcome, username"
        return
    }
    errorBanner.style.display = "none"
    greetText.innerText = `Welcome, ${res?.data.name.toLowerCase()}`
})

const data = {
    datasets: [{
      label: "Expenses",
      data: [12, 50, 100, 90, 24, 54],
      backgroundColor: [
        'rgb(236, 154, 0)',
        'rgb(0, 201, 0)',
        'rgb(96, 0, 160)',
        'rgb(0, 216, 245)',
        'rgb(223, 0, 0)',
        'rgb(0, 119, 231)'
      ],
      hoverOffset: 4
    }]
  };

new Chart(getCanvas, {
    type: 'doughnut',
    data: data
});
