

class Elements {
    constructor() {}

    createButton(text = "Click me", className = "btn") {
        const button = document.createElement("button")
        button.classList.add(className)
        button.innerText = text
        return button;
    }
}