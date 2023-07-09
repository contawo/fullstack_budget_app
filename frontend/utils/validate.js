
export class FormValidate {
    constructor(name, email, password, confirmPassword) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

    isValidName() {
        if (typeof this.name === "string" && this.name.trim().length === 0) return false;
        return true;
    }

    isValidEmail() {
        if (typeof this.email === "string" && this.email.trim().length === 0) return false;
        return true;
    }

    isAcceptableEmail() {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.+[a-zA-Z0-9-]*$/;
        if (this.email.match(validRegex) && this.isValidEmail()) return true;
        return false;
    }

    isValidPassword() {
        if (typeof this.password === "string" && this.password.trim().length === 0) return false;
        return true;
    }

    isConfirmPassword() {
        if (this.confirmPassword === this.password && this.password.trim().length != 0 && this.confirmPassword.trim().length != 0) return true;
        return false;
    }

    isValid() {
        if (this.isValidName() && this.isValidEmail() && this.isValidPassword()) return true;
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