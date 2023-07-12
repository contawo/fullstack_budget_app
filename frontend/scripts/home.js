import Database from "../utils/database.js";

// Getting the HTML Elements for manipulation
const errorBanner = document.querySelector(".main_auth_error");
const greetText = document.querySelector(".main_banner_header_text");
const getCanvas = document.querySelector(".main_spendings_container_data");
const bannerMotivation = document.querySelector(".main_banner_text");
const incomeAmount = document.querySelector(".main_account_container_income");
const expensesAmount = document.querySelector(".main_account_container_expense");
const budgetIndicator = document.querySelector(".main_budget_content_graph_indicator");
const adviceText = document.querySelector(".account_advice_text");
const budgetAmountText = document.querySelector(".main_budget_container_month");

budgetIndicator.style.width = "0%"; // Initialize the budget indicator

// Data that will be used by the graph
let representationData = [1, 1, 1, 1, 1, 1];

// Getting the user id from localStorage
const userID = JSON.parse(localStorage.getItem("userID"));

// Initializing the database
const database = new Database("http://localhost:8000")

// Getting the user information based on the userID
database.fetchData(`users/${userID}`).then(res => {
    if (res?.message === "Could not find user" || res === undefined) {
        errorBanner.style.display = "flex";
        greetText.innerText = "Welcome, username"

        // Displaying the graph with dummy data
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
        return
    }

    // Updating the UI with user information
    errorBanner.style.display = "none"
    greetText.innerText = `Welcome, ${res?.data.name.toLowerCase()}`
    bannerMotivation.innerText = `${res?.data.motivation}`
    adviceText.innerText = `${res?.data.advice}`
    budgetAmountText.innerText = `R${res?.data.budgetAmount}`

    let incomeSum = 0;
    let expensesSum = 0;
    let budgetAmount = 0;

    if (res?.data.income.length > 0) { 
      res?.data.income.forEach((income) => { // Calcualting the total income 
        incomeSum += income;
      })
      res?.data.expenses.forEach((expense) => {
        expensesSum += expense?.amount;
      })

      // Showing the percentange of expense with relation to budget on the ui
      budgetIndicator.style.width = `${(expensesSum / budgetAmount) * 100}%`;
    }

    if (res?.data.expenses.length > 0) { 
      expensesSum = 0;
      res?.data.expenses.forEach((expense) => { // Calcualting the total expenses
        expensesSum += expense?.amount;
      })

      // Updating the chart data
      representationData = [
        res.data.expenses.filter(expense => expense.expenseType === "Food").length,
        res.data.expenses.filter(expense => expense.expenseType === "Entertainment").length,
        res.data.expenses.filter(expense => expense.expenseType === "Clothing").length,
        res.data.expenses.filter(expense => expense.expenseType === "Rent").length,
        res.data.expenses.filter(expense => expense.expenseType === "Water").length,
        res.data.expenses.filter(expense => expense.expenseType === "Electricity").length,
      ]

      // Displaying the updated chart
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
    } else {
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
    }

    // Updating the ui with user data
    incomeAmount.innerText = `R${incomeSum}`;
    expensesAmount.innerText = `R${expensesSum}`;
    budgetAmount = res?.data.budgetAmount;
    
    // Updating and display the users performance
    let percentagePerformance = Math.floor((expensesSum / budgetAmount) * 100);
    if (percentagePerformance > 0 && percentagePerformance < 50) {
        const messages = {
            id: userID,
            advice: "If you keep on moving in this pace you will financially stress free, keep on spending less.",
            motivation: "You are moving on the right track"
        }
        database.postData("users/messages/update", messages).then(() => {
          budgetIndicator.style.backgroundColor = "rgb(0, 201, 0)";
        })
    }
    if (percentagePerformance >= 50 && percentagePerformance < 80) {
        const messages = {
            id: userID,
            advice: "Please slow dowm on the expenses in order to stay on budget, do not spend too much.",
            motivation: "Please be carefull on your expenses"
        }
        database.postData("users/messages/update", messages).then(() => {
          budgetIndicator.style.backgroundColor = "rgb(0, 119, 231)"
        })
    }
    if (percentagePerformance >= 80 && percentagePerformance < 100) {
        const messages = {
            id: userID,
            advice: "You have reached the peak of your budget, decrease on the expenses.",
            motivation: "You are spending too much, slow down."
        }
        database.postData("users/messages/update", messages).then(() => {
          budgetIndicator.style.backgroundColor = "rgb(236, 154, 0)"
        })
    }
    if (percentagePerformance === 100) {
        const messages = {
            id: userID,
            advice: "Please add more income or increase your budget because you have blown it.",
            motivation: "You have reached budget max."
        }
        database.postData("users/messages/update", messages).then((res) => {
          budgetIndicator.style.backgroundColor = "rgb(223, 0, 0)"
        })
    }
})

