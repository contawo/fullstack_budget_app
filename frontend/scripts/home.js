import Database from "../utils/database.js";

const errorBanner = document.querySelector(".main_auth_error");
const greetText = document.querySelector(".main_banner_header_text");
const getCanvas = document.querySelector(".main_spendings_container_data");
const bannerMotivation = document.querySelector(".main_banner_text");
const incomeAmount = document.querySelector(".main_account_container_income");
const expensesAmount = document.querySelector(".main_account_container_expense");
const budgetIndicator = document.querySelector(".main_budget_content_graph_indicator");
const adviceText = document.querySelector(".account_advice_text");

budgetIndicator.style.width = "0%";
let representationData = [1, 1, 1, 1, 1, 1];

const userID = JSON.parse(localStorage.getItem("userID"));
const database = new Database("http://localhost:8000")
database.fetchData(`users/${userID}`).then(res => {
    if (res?.message === "Could not find user" || res === undefined) {
        errorBanner.style.display = "flex";
        greetText.innerText = "Welcome, username"
        return
    }
    errorBanner.style.display = "none"
    greetText.innerText = `Welcome, ${res?.data.name.toLowerCase()}`
    bannerMotivation.innerText = `${res?.data.motivation}`
    adviceText.innerText = `${res?.data.advice}`

    let incomeSum = 0;
    let expensesSum = 0;
    let budgetAmount = 0;

    if (res?.data.income.length > 0) {
      res?.data.income.map((income) => {
        incomeSum += income;
      })
      budgetAmount = res?.data.budgetAmount;
      res?.data.expenses.map((expense) => {
        expensesSum += expense?.amount;
      })
      budgetIndicator.style.width = `${(expensesSum / budgetAmount) * 100}%`;
    }

    if (res?.data.expenses.length > 0) {
      res?.data.expenses.map((expense) => {
        expensesSum += expense?.amount;
      })
      representationData = [
        res.data.expenses.filter(expense => expense.expenseType === "Food").length,
        res.data.expenses.filter(expense => expense.expenseType === "Entertainment").length,
        res.data.expenses.filter(expense => expense.expenseType === "Clothing").length,
        res.data.expenses.filter(expense => expense.expenseType === "Rent").length,
        res.data.expenses.filter(expense => expense.expenseType === "Water").length,
        res.data.expenses.filter(expense => expense.expenseType === "Electricity").length,
      ]
    }

    incomeAmount.innerText = `R${incomeSum}`;
    expensesAmount.innerText = `R${expensesSum}`;
})

const data = {
    datasets: [{
      label: "Expenses",
      data: representationData,
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
