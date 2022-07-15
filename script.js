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

// book objs for test purposes

const warAndPeace = new Book("War and Peace", "Leo Tolstoy", 1000, 1869, false);
const catch22 = new Book("Catch-22", "Joseph Heller", 523, 1961, true);
const theOutsider = new Book("The Outsider", "Albert Camus", 156, 1942, true );
const cat = new Book("I Am A Cat", "Soseki Natsume", 456, 1972, false);
const joke = new Book("The Joke", "Milan Kundera", 600, 1980, true);
const speedboat = new Book("Speedboat", "Renata Adler", 400, 1960, true);


//builds the cards in the dom ready for append
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

    libBtnsDiv: document.querySelector(".buttons"),
    libBtnsLeft: document.querySelector(".left-hand"),

    newPopUp: document.querySelector(".new-pop-up"),
    closeNewBtn: document.getElementById("close"),
    newBtn: document.getElementById("new"),
    form: document.getElementById("new-book"),

    sortBtn: document.getElementById("sort"),
    sortWindow: document.querySelector(".sort-window"),

    currentSortBtn: document.getElementById("currentSort"),

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
        dom.newPopUp.classList.add("open");
    },
    close() {
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

//listener to remove sort tag and reset sort order
document.addEventListener("click", function (event) {
    if (event.target.id == "currentSort") {
        event.target.remove();
        sortingOrder = "default";
        refreshLibrary();
    }
})

//adds close button to an element (add on click func later?)
function makeCloseBtn() {
    let closeBtn = document.createElement("button");
    closeBtn.id = ("closeBtn");
    let closeIcon = document.createElement("img");
    closeIcon.setAttribute("src", "icons/close_FILL0_wght400_GRAD0_opsz48.svg");
    closeBtn.appendChild(closeIcon);
    return closeBtn;
}

//changes sort order and creates sort tag element based button clicked
document.querySelectorAll(".sortBtn").forEach(btn => {
    btn.addEventListener("click", function (event) {
        // if (event.currentTarget.className != ".sortBtn") {
        //     return;
        // } else {
    sortingOrder = event.currentTarget.id;
    let currentSortBtn = event.currentTarget.cloneNode(true);
    currentSortBtn.id = "currentSort";
    let closeBtn = makeCloseBtn();
    currentSortBtn.appendChild(closeBtn);
    dom.libBtnsLeft.appendChild(currentSortBtn);
    refreshLibrary();            
        })
});

//submit form to create new book. refresh library
dom.submitBtn.addEventListener("click", () => {
    const book = new Book;
    book.title = dom.titleField.value;
    book.author = dom.authorField.value;
    book.pages = dom.pagesField.value;
    (dom.readRadio.checked) ? book.read = true : book.read = false;
    library.books.push(book);
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
        const book = library.books[cardIndex];
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

// basic test library
const testBooks = [warAndPeace, catch22, theOutsider, cat, joke, speedboat];

// to be either test or user based on query:
const library = new Library(testBooks);


//set sorting order to default
let sortingOrder = "default";


//deletes book cards and builds new ones from array based on sorting order
function refreshLibrary() {

    const existingCards = document.querySelectorAll(".card");
    existingCards.forEach(element => element.remove());
    let books;

    switch (sortingOrder) {
        case "byTitle" :
            books = library.byTitle();
            break;
        case "byAuthor" :
            books = library.byAuthor();
            break;
        case "byYear" :
            books = library.byYear();
            break;
        default:
            books = library.books;
        }
    

    for (const [index, book] of library.books.entries()) {
        const existingCards = document.querySelectorAll(".card");
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

refreshLibrary();
