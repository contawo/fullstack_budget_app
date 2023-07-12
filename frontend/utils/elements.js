
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
        container.innerText = text
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

    createInfoElement(type, sign, amount, extraClass, text, showText) {
        const mainContainer = this.createContainer(`main_${type}_item`)
        const headerContainer = this.createContainer(`main_${type}_item_header`)
        const circleContainer = this.createContainer(`main_${type}_item_header_circle`, `${showText}`)
        circleContainer.classList.add(extraClass)
        const informationContainer = this.createContainer(`main_${type}_item_header_info`)
        const infoHeading = this.createHeading("h2", `main_${type}_item_header_info_title`, `${text}`)
        const infoParagraph = this.createParagraph("added", `main_${type}_item_header_info_text`)
        const amountText = this.createHeading("h3", `main_${type}_item_price`, `${sign}R${amount}`)

        informationContainer.appendChild(infoHeading);
        informationContainer.appendChild(infoParagraph);

        headerContainer.appendChild(circleContainer);
        headerContainer.appendChild(informationContainer);

        mainContainer.appendChild(headerContainer);
        mainContainer.appendChild(amountText)

        return mainContainer;
    }
}