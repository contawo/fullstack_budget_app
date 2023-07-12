// Form Error Handling and Presentation

export class FormValidate {
    constructor(){}

    isValidName(name) {
        if (typeof name === "string" && name.trim().length === 0) return false;
        return true;
    }

    isValidEmail(email) {
        if (typeof email === "string" && email.trim().length === 0) return false;
        return true;
    }

    isAcceptableEmail(email) {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.+[a-zA-Z0-9-]*$/;
        if (email.match(validRegex) && this.isValidEmail(email)) return true;
        return false;
    }

    isValidPassword(password) {
        if (typeof password === "string" && password.trim().length === 0) return false;
        return true;
    }

    isConfirmPassword(password, confirmPassword) {
        if (confirmPassword === password && password.trim().length != 0 && confirmPassword.trim().length != 0) return true;
        return false;
    }

    presentInvalidError(inputType, errorElement, message) {
        inputType.style.border = "1px solid rgb(165, 0, 0)";
        errorElement.innerText = `${message}`;
    }

    removeErrorPresentation(inputType, errorElement) {
        inputType.style.border = "1px solid rgb(187, 187, 187)";
        errorElement.innerText = "";
    }

    presentInvalidPasswords(passInput, confirmInput, errorElement, message) {
        confirmInput.style.border = "1px solid rgb(165, 0, 0)";
        confirmInput.style.color = "rgb(165, 0, 0)";
        passInput.style.border = "1px solid rgb(165, 0, 0)";
        passInput.style.color = "rgb(165, 0, 0)";
        errorElement.innerText = `${message}`;
    }

    removePasswordErrorPresentation(passInput, confirmInput, errorElement) {
        confirmInput.style.border = "1px solid rgb(187, 187, 187)";
        confirmInput.style.color = "rgb(0, 0, 0)";
        passInput.style.border = "1px solid rgb(187, 187, 187)";
        passInput.style.color = "rgb(0, 0, 0)";
        errorElement.innerText = "";
    }
}