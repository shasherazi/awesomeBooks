const booksList = document.querySelector('.main-books-list-ul');
const form = document.querySelector('.main-form-form');
const formTitle = document.querySelector('.main-form-form-title');
const formAuthor = document.querySelector('.main-form-form-author');
const newBookSection = document.querySelector('.add-new-book');
const bookListSection = document.querySelector('.book-list-display');
const contactSection = document.querySelector('.contact-info');
const newBtn = document.querySelector('#new');
const listBtn = document.querySelector('#list');
const contactBtn = document.querySelector('#contact');
const date = document.querySelector('#currentDate');

class Book {
  static books = [];

  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  /* eslint-disable class-methods-use-this */
  addBookToView(title, author) {
    Book.books.push({
      title,
      author,
    });

    formTitle.value = '';
    formAuthor.value = '';

    const bookItem = document.createElement('li');
    bookItem.classList.add('main-books-list-ul-li');
    bookItem.innerHTML = `
    <div>
      <div class='books-display'>
        <div class='book-name'>
          <p class="main-books-list-ul-li-title">"${title}" by </p>
          <p class="main-books-list-ul-li-author">${author}</p>
        </div>
        <div>
          <button class="main-books-list-ul-li-button">Remove</button>
        </div>
      </div>
      <hr class="main-books-list-ul-li-hr">
    </div>
            `;
    booksList.appendChild(bookItem);
  }

  removeBook() {
    Book.books = Book.books.filter((book) => book.title !== this.title);
    updateLocalStorage(); // eslint-disable-line no-use-before-define
  }
}

function display(show, hide1, hide2) {
  show.style.display = 'block';
  hide1.style.display = 'none';
  hide2.style.display = 'none';
}

function updateLocalStorage() {
  // Add item to local storage
  localStorage.setItem('booksArray', JSON.stringify(Book.books));
}

function updateClock() {
  const now = new Date();
  date.innerHTML = now.toString().substring(0, 21);
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
    e.target.parentElement.parentElement.remove();

    const book = new Book(
      e.target.parentElement.querySelector('.main-books-list-ul-li-title').innerText,
      e.target.parentElement.querySelector('.main-books-list-ul-li-author').innerText,
    );
    book.removeBook();
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

// Show current date
setInterval(updateClock, 1000);

bookListSection.style.display = 'none';
contactSection.style.display = 'none';

newBtn.addEventListener('click', () => {
  display(newBookSection, bookListSection, contactSection);
});

listBtn.addEventListener('click', () => {
  display(bookListSection, newBookSection, contactSection);
});

contactBtn.addEventListener('click', () => {
  display(contactSection, newBookSection, bookListSection);
});