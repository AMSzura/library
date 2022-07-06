class Book {
    constructor(title, author, pages, year, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.year = year;
        this.read = read;
    }
}

class Library {
    constructor(books) {
        this.books = books;
    }
    }

Library.prototype.byAuthor = function () {
    const sorted = this.books.sort((a, b) => {
        if (a.author.split(" ")[1] > b.author.split(" ")[1]) {
            return 1;
        }
        if (a.author.split(" ")[1] < b.author.split(" ")[1]) {
            return -1;
        }
        return 0;
    });
    return sorted;
}

Library.prototype.byTitle = function () { 
    const sorted = this.books.sort((a, b) => {
if (a.title > b.title) {
    return 1;
}
if (a.title < b.title) {
    return -1;
}
return 0;      
    });
    return sorted;
}

Library.prototype.byYear = function () {
    const sorted = this.books.sort((a, b) => {
        if (a.year > b.year) {
            return 1;
        }
        if (a.year < b.year) {
            return -1;
        }
        return 0;
    });
    return sorted;
}

const warAndPeace = new Book("War and Peace", "Leo Tolstoy", 1000, 1869, false);
const catch22 = new Book("Catch-22", "Joseph Heller", 523, 1961, true);
const theOutsider = new Book("The Outsider", "Albert Camus", 156, 1942, true );

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

    this.readBtn = document.createElement("button");
    this.readBtn.classList.add("read-check")
    this.readBtn.setAttribute("type", "button");
    this.card.appendChild(this.readBtn);

    this.title = document.createElement("h1");
    this.content.appendChild(this.title);

    let by = document.createElement("p");
    by.textContent = "by";
    this.content.appendChild(by);

    this.author = document.createElement("h3");
    this.content.appendChild(this.author);

    this.info = document.createElement("div");
    this.info.classList.add("extra-info");
    this.card.appendChild(this.info);

    this.pages = document.createElement("p");
    this.info.appendChild(this.pages);


}

//object of dom vars

const dom = {

    library: document.querySelector(".library"),

    newPopUp: document.querySelector(".new-pop-up"),
    closeNewBtn: document.getElementById("close"),
    newBtn: document.getElementById("new"),
    form: document.getElementById("new-book"),

    sortBtn: document.getElementById("sort"),
    sortWindow: document.querySelector(".sort-window"),

    byTitle: document.getElementById("byTitle"),
    byAuthor: document.getElementById("byAuthor"),
    byYear: document.getElementById("byYear"),

    cards: document.querySelectorAll(".card"),

    titleField: document.getElementById("title"),
    authorField: document.getElementById("author"),
    pagesField: document.getElementById("pages"),
    readRadio: document.getElementById("read"),
    submitBtn: document.getElementById("submit"),
    deleteBtn: document.querySelectorAll(".delete"),


}

const newBookWindow = {
    open() {
        // dom.newPopUp.style.visibilty = "visible";
        dom.newPopUp.classList.add("open");
    },
    close() {
        // dom.newPopUp.style.visibility = "hidden";
        dom.newPopUp.classList.remove("open");
    }
}

const sortWindow = {
    open() {
    dom.sortWindow.classList.add("open");   
    },
    close() {
        dom.sortWindow.classList.remove("open");
    },

}

//event listeners

dom.closeNewBtn.addEventListener("click", newBookWindow.close);

dom.newBtn.addEventListener("click", newBookWindow.open);

dom.sortBtn.addEventListener("click", sortWindow.open);

document.addEventListener("click", function (event) {
    if (event.target != dom.sortBtn 
        && event.target != dom.sortBtn.firstElementChild
        && event.target != dom.sortWindow) {
        sortWindow.close();
    }
})

document.addEventListener("click", function (event) {
    switch(event.target) {
        case dom.byTitle:

    }
})

//submit form to create new book. refresh library
dom.submitBtn.addEventListener("click", () => {
    const book = new Book;
    book.title = dom.titleField.value;
    book.author = dom.authorField.value;
    book.pages = dom.pagesField.value;
    (dom.readRadio.checked) ? book.read = true : book.read = false;
    books.push(book);
    newBookWindow.close();
    refreshLibrary();
});


//card delete listener
document.addEventListener("click", function (event) {
    const cardIndex = event.target.getAttribute("data");
    if (event.target.className == "delete") {
        event.target.parentElement.remove();
        books.splice(cardIndex, 1);
    } else if (event.target.className == "delete-img") {
        event.target.parentElement.parentElement.remove();
        books.splice(cardIndex, 1);
    }
})

// on click func to change read status of book
document.addEventListener("click", function (event) {
    if (event.target.matches(".read-check" || event.target.matches(".read-check.true"))) {
        const cardIndex = event.target.parentElement.getAttribute("data");
        const book = books[cardIndex];
        console.log(cardIndex);
        if (book.read === false) {
            book.read = true;
            event.target.classList.add("true");
        } else if (book.read === true) {
            book.read = false;
            event.target.classList.remove("true");
        }
    }

})

function byTitle(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1
    }
    return 0
}

function byAuthor(a, b) {
    if (a.author.split(" ")[1] > b.author.split(" ")[1]) {
        return 1;
    }
    if (a.author.split(" ")[1] < b.author.split(" ")[1]) {
        return -1
    }
    return 0
}


// basic test library
const books = [warAndPeace, catch22, theOutsider];

// to be either test or user based on query:
const library = new Library(books);


function refreshLibrary() {

    const existingCards = document.querySelectorAll(".card");
    existingCards.forEach(element => element.remove());

    for (const [index, book] of books.entries()) {
        const existingCards = document.querySelectorAll(".card");
        // if (existingCards[index]) {
        //     continue;
        // } else {
        const card = new createCard();
        card.title.innerText = book.title;
        card.author.innerText = book.author;
        card.pages.innerText = "Pages: " + book.pages;
        if (book.read === true) {
            card.readBtn.classList.add("true");
        }
        card.card.setAttribute("data", index);
        dom.library.appendChild(card.card);
    }
}

alphaBooks = books.sort(byTitle);

refreshLibrary();
