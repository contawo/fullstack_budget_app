
export default class Elements {
    constructor() {}

    createButton(text = "Click me", className = "btn") {
        const button = document.createElement("button");
        button.classList.add(className);
        button.innerText = text;
        return button;
    }

    createContainer(className, text = "") {
        const container = document.createElement("div");
        container.classList.add(className);
        container.innerText(text)
        return container;
    }

    createHeading(type, className, text) {
        const heading = document.createElement(type);
        heading.classList.add(className);
        heading.innerText = text;
        return heading;
    }

    createParagraph(text, className) {
        const paragraph = document.createElement("p");
        paragraph.innerText = text;
        paragraph.classList.add(className);
        return paragraph;
    }

    createInput(type, placeholder = "", className) {
        const input = document.createElement("input");
        input.setAttribute("placeholder", placeholder)
        input.type = type;
        input.classList.add(className)
        return input;
    }
}