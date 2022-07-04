class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

const warAndPeace = new Book("War and Peace", "Leo Tolstoy", 1000, false);
const catch22 = new Book("Catch-22", "Joseph Heller", "Leo Tolstoy", 523, true);

function createCard() {

    this.card = document.createElement("div");
    this.card.classList.add("card");

    this.deleteBtn = document.createElement("button");
    this.deleteBtn.classList.add("delete")
    this.card.appendChild(this.deleteBtn);

    let icon = document.createElement("img");
    icon.setAttribute("src", "icons/close_FILL0_wght400_GRAD0_opsz48.svg");
    this.deleteBtn.appendChild(icon);

    this.content = document.createElement("div");
    this.content.classList.add("card-content");
    this.card.appendChild(this.content);

    this.readBtn = document.createElement("input");
    this.readBtn.classList.add("read")
    this.readBtn.setAttribute("type", "radio");
    this.card.appendChild(this.readBtn);

    this.title = document.createElement("h1");
    this.content.appendChild(this.title);

    let by = document.createElement("p");
    by.textContent = "by";
    this.content.appendChild(by);

    this.author = document.createElement("h3");
    this.content.appendChild(this.author);

}


const dom = {

    library: document.querySelector(".library"),

}

const library = document.querySelector(".library");


const books = [warAndPeace, catch22];

function refreshLibrary() {

    for (let book of books) {
        let card = new createCard();
        card.title.innerText = book.title;
        card.author.innerText = book.author;
        card.card.setAttribute("data", "0");
        dom.library.appendChild(card.card);
    }
}

refreshLibrary();
