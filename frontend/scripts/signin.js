import {FormValidate} from "../utils/validate.js";
import Database from "../utils/database.js";

const emailInput = document.querySelector(".email")
const passwordInput = document.querySelector(".password")
const submitButton = document.body.querySelector(".submit_form")
const errorMessage = document.querySelector(".error_message")

submitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const valid = new FormValidate("", emailInput.value, passwordInput.value, "");

    const userInfo = {
        email: emailInput.value,
        password: passwordInput.value
    }

    if (!valid.isValidEmail()) {
        valid.presentInvalidError(emailInput, errorMessage, "Please enter your email")
        return
    } else {
        valid.removeErrorPresentation(emailInput, errorMessage);
    }
    
    if (!valid.isAcceptableEmail()) {
        valid.presentInvalidError(emailInput, errorMessage, "Please enter a valid email")
        return
    } else {
        valid.removeErrorPresentation(emailInput, errorMessage);
    }

    if (!valid.isValidPassword()) {
        valid.presentInvalidError(passwordInput, errorMessage, "Please enter your password")
        return
    } else {
        valid.removeErrorPresentation(passwordInput, errorMessage);
    }

})