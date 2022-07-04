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
    icon.classList.add("delete-img")
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

//object of dom vars

const dom = {

    library : document.querySelector(".library"),
    newPopUp: document.querySelector(".new-pop-up"),
    closeNewBtn : document.getElementById("close"),
    newBtn : document.getElementById("new"),
    form : document.getElementById("new-book"),

    cards : document.querySelectorAll(".card"),

    titleField : document.getElementById("title"),
    authorField : document.getElementById("author"),
    pagesField : document.getElementById("pages"),
    readRadio : document.getElementById("read"),
    submitBtn : document.getElementById("submit"),
    deleteBtn : document.querySelectorAll(".delete"),

        
    }

const newBookWindow = {
    open() {
        dom.newPopUp.style.display = "flex";
    },
    close() {
        dom.newPopUp.style.display = "none";
    }
}

//event listeners

dom.closeNewBtn.addEventListener("click", newBookWindow.close);

dom.newBtn.addEventListener("click", newBookWindow.open);

dom.submitBtn.addEventListener("click", () => {
    let book = new Book;
    book.title = dom.titleField.value;
    book.author = dom.authorField.value;
    book.pages = dom.pagesField.value;
    (dom.readRadio.checked) ? book.read = true : book.read = false;
    books.push(book);
    newBookWindow.close();
    refreshLibrary();
});

document.addEventListener("click", function(event) {
    cardIndex = event.target.getAttribute("data");
    if (event.target.className == "delete") {
        event.target.parentElement.remove();
        books.splice(cardIndex, 1);
    } else if (event.target.className == "delete-img") {
        event.target.parentElement.parentElement.remove();
        books.splice(cardIndex, 1);
    }
})



const books = [warAndPeace, catch22];

function refreshLibrary() {

    for (const [index, book] of books.entries()) {
        const existingCards = document.querySelectorAll(".card");
        if (existingCards[index]) {
            continue;
        } else {
        const card = new createCard();
        card.title.innerText = book.title;
        card.author.innerText = book.author;
        card.card.setAttribute("data", index);
        dom.library.appendChild(card.card);
        }
    }
    // let deleteBtn = document.querySelectorAll(".delete");
    // deleteBtn.addEventListener("click", deleteBook);
}



refreshLibrary();
