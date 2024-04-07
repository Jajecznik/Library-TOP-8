const form = document.getElementById('new-book-form');
const contentContainer = document.querySelector('.content');

const books = [];

form.addEventListener('submit', (event) => {
    event.preventDefault();
    addBookToLibrary();
    displayBooks();
});

const Book = function (title, author, numberOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
}

function addBookToLibrary() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const numberOfPages = document.getElementById('number-of-pages').value;
    const isRead = document.getElementById('is-read').checked;

    if (title.trim() !== '' && author.trim() !== '' && numberOfPages.trim() !== '') {
        const book = new Book(title, author, numberOfPages, isRead);
        books.push(book);
        form.reset();
    }
}

function displayBooks() {
    while (contentContainer.firstChild) {
        contentContainer.removeChild(contentContainer.firstChild);
    }

    books.forEach(function (book, index) {
        const card = document.createElement('div');

        const cardContentContainer = document.createElement('div');
        const titleHeader = document.createElement('p');
        const titleElement = document.createElement('p');
        const authorHeader = document.createElement('p');
        const authorElement = document.createElement('p');
        const numberOfPagesHeader = document.createElement('p');
        const numberOfPagesElement = document.createElement('p');
        const isReadHeader = document.createElement('p');
        const isReadElement = document.createElement('p');

        const buttonsContainer = document.createElement('div');
        const readBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        titleHeader.innerText = "Title";
        titleElement.innerText = book.title;
        authorHeader.innerText = "Author";
        authorElement.innerText = book.author;
        numberOfPagesHeader.innerText = "Number of pages";
        numberOfPagesElement.innerText = book.numberOfPages;
        isReadHeader.innerText = "Is read?";
        isReadElement.innerText = book.isRead ? "Yes" : "No";

        readBtn.innerText = book.isRead ? "Mark as unread" : "Mark as read";
        deleteBtn.innerText = "Delete";
        readBtn.id = "read-button";
        deleteBtn.id = "delete-button";
        buttonsContainer.appendChild(readBtn);
        buttonsContainer.appendChild(deleteBtn);

        cardContentContainer.appendChild(titleHeader);
        cardContentContainer.appendChild(titleElement);
        cardContentContainer.appendChild(authorHeader);
        cardContentContainer.appendChild(authorElement);
        cardContentContainer.appendChild(numberOfPagesHeader);
        cardContentContainer.appendChild(numberOfPagesElement);
        cardContentContainer.appendChild(isReadHeader);
        cardContentContainer.appendChild(isReadElement);

        cardContentContainer.classList.add('card-content-container');
        card.appendChild(cardContentContainer);
        buttonsContainer.classList.add('buttons-container');
        card.appendChild(buttonsContainer);
        card.classList.add('card');
        card.dataset.index = index;
        contentContainer.appendChild(card);

        readBtn.addEventListener('click', () => {
            book.isRead = !book.isRead;
            isReadElement.innerText = book.isRead ? "Yes" : "No";
            readBtn.innerText = book.isRead ? "Mark as unread" : "Mark as read";
        });

        deleteBtn.addEventListener('click', () => {
            let index = card.dataset.index;
            books.splice(index, 1);
            displayBooks();
        });
    });
}
