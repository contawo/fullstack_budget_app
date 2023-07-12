import Database from "../utils/database.js";
import { FormValidate } from "../utils/validate.js";
import Elements from "../utils/elements.js";

const errorBanner = document.querySelector(".main_auth_error")
const greetText = document.querySelector(".main_banner_header_text")
const bannerMotivation = document.querySelector(".main_banner_text");

const getIncomeLink = document.querySelector(".income");
const getExpensesLink = document.querySelector(".expenses");
const getBudgetLink = document.querySelector(".budget");
const getAddLink = document.querySelector(".add");

const getIncomeContainer = document.querySelector(".main_income");
const getExpensesContainer = document.querySelector(".main_expenses");
const getBudgetContainer = document.querySelector(".main_budget");
const getAddContainer = document.querySelector(".main_add");

let budgetAmount = 0;
let expensesAmount = 0;
let incomeAmount = 0;

const userID = JSON.parse(localStorage.getItem("userID"));
const database = new Database("http://localhost:8000");
const elements = new Elements();
database.fetchData(`users/${userID}`).then(res => {
    if (res?.message === "Could not find user" || res === undefined) {
        errorBanner.style.display = "flex"
        greetText.innerText = "Welcome, username"
        return
    }
    errorBanner.style.display = "none"
    greetText.innerText = `Welcome, ${res?.data.name.toLowerCase()}`
    bannerMotivation.innerText = `${res?.data.motivation}`
    if (res?.data.income.length > 0) {
        getIncomeContainer.innerHTML = "";
        res?.data.income.map(income => {
            const cont = elements.createInfoElement("income", "+", income, "income", "INCOME", "in")
            getIncomeContainer.appendChild(cont);
            incomeAmount += income;
        })
    }
    if (res?.data.expenses.length > 0) {
        getExpensesContainer.innerHTML = "";
        res?.data.expenses.map(expense => {
            const cont = elements.createInfoElement("expenses", "-", expense.amount, `${expense.expenseType.toLowerCase()}`, `${expense.expenseType.toUpperCase()}`, "out");
            getExpensesContainer.appendChild(cont);
            expensesAmount += expense.amount;
        })
    }
    budgetAmount = res?.data.budgetAmount;
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
const budgetError = document.querySelector(".main_budget_error");
const budgetInput = document.querySelector(".main_budget_input");
const addTypeContainer = document.querySelector(".main_add_select");

const addError = document.querySelector(".main_add_error");
const addButton = document.querySelector(".main_add_button");
const addInput = document.querySelector(".main_add_input");
const expenseTypeContainer = document.querySelector(".main_add_expense_select");

const formValidate = new FormValidate();

budgetButton.addEventListener("click", () => {
    if (!budgetInput.value) {
        formValidate.presentInvalidError(budgetInput, budgetError, "Please enter an amount")
        return
    }
    formValidate.removeErrorPresentation(budgetInput, budgetError);
    
    if (parseInt(budgetInput.value) >= incomeAmount) {
        formValidate.presentInvalidError(budgetInput, budgetError, `Budget R${parseInt(budgetInput.value)} cannot exceed R${incomeAmount} income`)
        return
    }
    formValidate.removeErrorPresentation(budgetInput, budgetError);

    const info = {
        id: userID,
        amount: parseInt(budgetInput.value)
    }

    database.postData("users/budget/update", info).then(res => {
        if (res?.message === "Failed to update budget") {
            budgetError.innerText = "Create account to add budget"
            return
        }
        budgetError.innerText = "";
        alert("Budget updated successfully")
        window.location.reload();
    }).catch(() => {
        budgetError.innerText = "Server error, please try again"
        return
    })
})

addButton.addEventListener("click", () => {
    if (selectedType === "") {
        formValidate.presentInvalidError(addTypeContainer, addError, "Please choose a type")
        return
    } else {
        formValidate.removeErrorPresentation(addTypeContainer, addError)
    }

    if (selectedType === "Expense") {
        if (selectedExpense === "") {
            formValidate.presentInvalidError(expenseTypeContainer, addError, "Please choose expense type")
            return
        } else {
            formValidate.removeErrorPresentation(expenseTypeContainer, addError)
        }
        
        if (!addInput.value) {
            formValidate.presentInvalidError(addInput, addError, "Please enter amount")
            return
        } else {
            formValidate.removeErrorPresentation(addInput, addError)
        }

        parseInt()
        if ((expensesAmount + parseInt(addInput.value)) >= budgetAmount) {
            console.log("Expense:", expensesAmount)
            console.log("Budget:", budgetAmount)
            console.log("Input", parseInt(addInput.value))
            console.log("Sum", (expensesAmount + parseInt(addInput.value)))
            formValidate.presentInvalidError(addInput, addError, `Adding R${parseInt(addInput.value)} will exceed the budget R${budgetAmount}`)
            return
        } else {
            formValidate.removeErrorPresentation(addInput, addError);
        }

        const info = {
            id: userID,
            expenseType: selectedExpense,
            amount: parseInt(addInput.value)
        }

        database.postData("users/expenses/add", info).then(res => {
            if (res?.message === "Could not add expense") {
                addError.innerText = "Create account to add expense"
                return 
            }
            addError.innerText = "";
            alert("Expense added successfully");
            window.location.reload();
        }).catch(() => {
            addError.innerText = "Server error, please try again"
            return
        })
    } 
    else {
        if (!addInput.value) {
            formValidate.presentInvalidError(addInput, addError, "Please enter amount")
            return
        } else {
            formValidate.removeErrorPresentation(addInput, addError)
        }
        
        const info = {
            id: userID,
            amount: parseInt(addInput.value)
        }

        database.postData("users/income/add", info).then(res => {
            if (res?.message === "Could not add income") {
                addError.innerText = "Create account to add income"
                return
            }
            addError.innerText = "";
            alert("Income addded successfully")
            window.location.reload();
        }).catch(() => {
            addError.innerText = "Server error, please try again"
            return
        })
    }
})