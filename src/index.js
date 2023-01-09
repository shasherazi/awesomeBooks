const booksList = document.querySelector('.main-books-list-ul');
const form = document.querySelector('.main-form-form');
const title = document.querySelector('.main-form-form-title');
const author = document.querySelector('.main-form-form-author');
let books = [];

function updateLocalStorage() {
  // Add item to local storage
  localStorage.setItem('booksArray', JSON.stringify(books));
}

function removeBook(title) {
  // Remove book from the books array
  books = books.filter((book) => book.title !== title);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const book = {
    title: title.value,
    author: author.value,
  };
  books.push(book);
  title.value = '';
  author.value = '';

  const bookItem = document.createElement('li');
  bookItem.classList.add('main-books-list-ul-li');
  bookItem.innerHTML = `
        <p class="main-books-list-ul-li-title">${book.title}</p>
        <p class="main-books-list-ul-li-author">${book.author}</p>
        <button class="main-books-list-ul-li-button">Remove</button>
        <hr class="main-books-list-ul-li-hr">
    `;
  booksList.appendChild(bookItem);

  updateLocalStorage();
});

// Remove books from the List and from the books array
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('main-books-list-ul-li-button')) {
    e.target.parentElement.remove();

    const title = e.target.parentElement.querySelector('.main-books-list-ul-li-title').innerText;
    removeBook(title);
    updateLocalStorage();
  }
});
