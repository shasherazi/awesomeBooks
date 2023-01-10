const booksList = document.querySelector('.main-books-list-ul');
const form = document.querySelector('.main-form-form');
const formTitle = document.querySelector('.main-form-form-title');
const formAuthor = document.querySelector('.main-form-form-author');

class Book {
    static books = [];

    constructor(title, author) {
      this.title = title;
      this.author = author;
    }

    addBookToView(title, author) {
      /* eslint-disable class-methods-use-this */
      Book.books.push({
        title,
        author,
      });

      formTitle.value = '';
      formAuthor.value = '';

      const bookItem = document.createElement('li');
      bookItem.classList.add('main-books-list-ul-li');
      bookItem.innerHTML = `
    <p class="main-books-list-ul-li-title">${title}</p>
            <p class="main-books-list-ul-li-author">${author}</p>
            <button class="main-books-list-ul-li-button">Remove</button>
            <hr class="main-books-list-ul-li-hr">
            `;
      booksList.appendChild(bookItem);
      /* eslint-disable class-methods-use-this */
    }

    removeBook() {
      Book.books = Book.books.filter((book) => book.title !== this.title);
    }
}

function updateLocalStorage() {
  // Add item to local storage
  localStorage.setItem('booksArray', JSON.stringify(Book.books));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const book = new Book(formTitle.value, formAuthor.value);
  book.addBookToView(formTitle.value, formAuthor.value);
  updateLocalStorage();
});

// Remove books from the List and from the books array
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('main-books-list-ul-li-button')) {
    e.target.parentElement.remove();

    const book = new Book(e.target.parentElement.querySelector('.main-books-list-ul-li-title').innerText, e.target.parentElement.querySelector('.main-books-list-ul-li-author').innerText);
    book.removeBook();
    updateLocalStorage();
  }
});

// Get books from local storage
document.addEventListener('DOMContentLoaded', () => {
  const books = JSON.parse(localStorage.getItem('booksArray'));
  if (books) {
    books.forEach((book) => {
      const bookItem = new Book(book.title, book.author);
      bookItem.addBookToView(book.title, book.author);
    });
  }
});