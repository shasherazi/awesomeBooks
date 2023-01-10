class Books {
  constructor() {
    this.booksList = document.querySelector('.main-books-list-ul');
    this.form = document.querySelector('.main-form-form');
    this.formTitle = document.querySelector('.main-form-form-title');
    this.formAuthor = document.querySelector('.main-form-form-author');
    this.books = [];

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addBookToView(this.formTitle.value, this.formAuthor.value);
      this.updateLocalStorage();
    });

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('main-books-list-ul-li-button')) {
        e.target.parentElement.remove();

        const title = e.target.parentElement.querySelector('.main-books-list-ul-li-title').innerText;
        this.removeBook(title);
        this.updateLocalStorage();
      }
    });

    document.addEventListener('DOMContentLoaded', () => {
      const books = JSON.parse(localStorage.getItem('booksArray'));
      if (books) {
        books.forEach((book) => {
          this.addBookToView(book.title, book.author);
        });
      }
    });
  }

  updateLocalStorage() {
    localStorage.setItem('booksArray', JSON.stringify(this.books));
  }

  removeBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }

  addBookToView(title, author) {
    this.books.push({
      title,
      author,
    });
    this.formTitle.value = '';
    this.formAuthor.value = '';

    const bookItem = document.createElement('li');
    bookItem.classList.add('main-books-list-ul-li');
    bookItem.innerHTML = `
      <p class="main-books-list-ul-li-title">${title}</p>
      <p class="main-books-list-ul-li-author">${author}</p>
      <button class="main-books-list-ul-li-button">Remove</button>
      <hr class="main-books-list-ul-li-hr">
    `;
    this.booksList.appendChild(bookItem);
  }
}

let books = new Books();
