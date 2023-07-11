import Database from "../utils/database.js";
import { testData } from "../utils/testData.js";

const errorBanner = document.querySelector(".main_auth_error")
const greetText = document.querySelector(".main_banner_header_text")

const userID = JSON.parse(localStorage.getItem("userID"));
const database = new Database("http://localhost:8000")
database.fetchData(`users/${userID}`).then(res => {
    if (res?.message === "Could not find user" || res === undefined) {
        errorBanner.style.display = "flex"
        greetText.innerText = "Welcome, username"
        return
    }
    errorBanner.style.display = "none"
    greetText.innerText = `Welcome, ${res?.data.name.toLowerCase()}`
})

// Select bar
const getSelectBox = document.querySelector(".main_add_select")
const getSelectBoxText = document.querySelector(".main_add_select_text")
const getOptionsContainer = document.querySelector(".main_add_options")
const getOption = document.querySelectorAll(".main_add_option")
const getExpenseContainer = document.querySelector(".main_add_expense_select_container")

let selectedType = ""
let selectedExpense = ""

getOptionsContainer.style.display = "none"
getExpenseContainer.style.display = "none";

getSelectBox.addEventListener("click", () => {
    getOptionsContainer.style.display = "flex"
})

getOption.forEach(option => {
    const optionText = option.querySelector(".main_add_option_text")
    optionText.addEventListener("click", () => {
        getSelectBoxText.innerText = optionText.innerText;
        selectedType = optionText.innerText;
        getOptionsContainer.style.display = "none";
        if (getSelectBoxText.innerText === "Expense") {
            getExpenseContainer.style.display = "flex";
        } else {
            getExpenseContainer.style.display = "none";
        }
    })
})

// Select Expenses bar
const getExpenseSelectBox = document.querySelector(".main_add_expense_select")
const getExpenseSelectBoxText = document.querySelector(".main_add_expense_select_text")
const getExpenseOptionsContainer = document.querySelector(".main_add_expense_options")
const getExpenseOption = document.querySelectorAll(".main_add_expense_option")

getExpenseOptionsContainer.style.display = "none";

getExpenseSelectBox.addEventListener("click", () => {
    getExpenseOptionsContainer.style.display = "flex"
})

getExpenseOption.forEach(optione => {
    const optionExpenseText = optione.querySelector(".main_add_expense_option_text")
    optionExpenseText.addEventListener("click", () => {
        getExpenseSelectBoxText.innerText = optionExpenseText.innerText;
        selectedExpense = optionExpenseText.innerText;
        getExpenseOptionsContainer.style.display = "none";
    })
})

// Info toggle Navigation Bar
const getIncomeLink = document.querySelector(".income");
const getExpensesLink = document.querySelector(".expenses");
const getBudgetLink = document.querySelector(".budget");
const getAddLink = document.querySelector(".add");

const getIncomeContainer = document.querySelector(".main_income");
const getExpensesContainer = document.querySelector(".main_expenses");
const getBudgetContainer = document.querySelector(".main_budget");
const getAddContainer = document.querySelector(".main_add");

getIncomeLink.classList.add("active")
let activeLink = getIncomeLink.innerText;

getIncomeContainer.style.display = "flex";
getExpensesContainer.style.display = "none";
getBudgetContainer.style.display = "none";
getAddContainer.style.display = "none";

getIncomeLink.addEventListener("click", () => {
    getIncomeLink.classList.add("active")
    getExpensesLink.classList.remove("active")
    getBudgetLink.classList.remove("active")
    getAddLink.classList.remove("active")

    getIncomeContainer.style.display = "flex";
    getExpensesContainer.style.display = "none";
    getBudgetContainer.style.display = "none";
    getAddContainer.style.display = "none";

    activeLink = getIncomeLink.innerText;
})

getExpensesLink.addEventListener("click", () => {
    getIncomeLink.classList.remove("active")
    getExpensesLink.classList.add("active")
    getBudgetLink.classList.remove("active")
    getAddLink.classList.remove("active")

    getIncomeContainer.style.display = "none";
    getExpensesContainer.style.display = "flex";
    getBudgetContainer.style.display = "none";
    getAddContainer.style.display = "none";

    activeLink = getExpensesLink.innerText;
})

getBudgetLink.addEventListener("click", () => {
    getIncomeLink.classList.remove("active")
    getExpensesLink.classList.remove("active")
    getBudgetLink.classList.add("active")
    getAddLink.classList.remove("active")

    getIncomeContainer.style.display = "none";
    getExpensesContainer.style.display = "none";
    getBudgetContainer.style.display = "flex";
    getAddContainer.style.display = "none";

    activeLink = getBudgetLink.innerText;
})

getAddLink.addEventListener("click", () => {
    getIncomeLink.classList.remove("active")
    getExpensesLink.classList.remove("active")
    getBudgetLink.classList.remove("active")
    getAddLink.classList.add("active")

    getIncomeContainer.style.display = "none";
    getExpensesContainer.style.display = "none";
    getBudgetContainer.style.display = "none";
    getAddContainer.style.display = "flex";

    activeLink = getAddLink.innerText;
})

// Error Handling
const budgetButton = document.querySelector(".main_budget_button");
const bugetError = document.querySelector(".main_budget_error");
const budgetInput = document.querySelector(".main_budget_input");
const addTypeContainer = document.querySelector(".main_add_select");

const addError = document.querySelector(".main_add_error");
const addButton = document.querySelector(".main_add_button");
const addInput = document.querySelector(".main_add_input");
const expenseTypeContainer = document.querySelector(".main_add_expense_select");

budgetButton.addEventListener("click", () => {
    if (!budgetInput.value) {
        bugetError.innerHTML = "Please enter a amount"
        return
    }
    bugetError.innerHTML = ""
    console.log(budgetInput.value)
})

addButton.addEventListener("click", () => {
    if (selectedType === "") {
        addError.innerText = "Please choose a type";
        addTypeContainer.style.border = "1px solid rgb(165, 0, 0)"
        return
    } else {
        addError.innerText = "";
        addTypeContainer.style.border = "1px solid rgb(187, 187, 187)"
    }

    if (selectedType === "Expense") {
        if (selectedExpense === "") {
            addError.innerText = "Please choose expense type";
            expenseTypeContainer.style.border = "1px solid rgb(165, 0, 0)"
            return
        } else {
            addError.innerText = "";
            expenseTypeContainer.style.border = "1px solid rgb(187, 187, 187)"
        }
        
        if (!addInput.value) {
            addError.innerText = "Please enter amount";
            addInput.style.border = "1px solid rgb(165, 0, 0)";
            return
        } else {
            addError.innerText = "";
            addInput.style.border = "1px solid rgb(187, 187, 187)";
        }

        console.log("Selected Type:", selectedType);
        console.log("Selected Expense:", selectedExpense);
        console.log("Amount:", addInput.value)
    } 
    else {
        if (!addInput.value) {
            addError.innerText = "Please enter amount";
            addInput.style.border = "1px solid rgb(165, 0, 0)";
            return
        } else {
            addError.innerText = "";
            addInput.style.border = "1px solid rgb(187, 187, 187)";
        }

        console.log("Selected Type:", selectedType);
        console.log("Amount:", addInput.value)
    }
})