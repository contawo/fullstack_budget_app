

export function name() {
    return "Hello World"
}

export function Button(text, className) {
    const button = document.createElement("button")
    button.classList.add(className)
    button.innerText = text

    return button
}

const headingName = ["h1", "h2", "h3"]

export class Elements {
    constructor() {}

    createButton(text = "Click me", className = "cls") {
        const button = document.createElement("button")
        button.classList.add(className)
        button.innerText = text

        return button
    }

    heading(type, text, className) {
        const heading = document.createElement(type)
        heading.classList.add(className)
        heading.innerText = text

        return heading;
    }
}

export class Document1 {
    createElement(name) {
        return name
    }
}