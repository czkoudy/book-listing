class Book {
  constructor(title, author, isbn){
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}


class UI {
  static displayBooks(){
    const storedBooks = Store.getBooks()
    const books = storedBooks

    books.forEach(book => UI.addBookToList(book))
  }


  static addBookToList(book) {
    const list = document.getElementById('book-list');

    const row = document.createElement('tr')
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);


  }

  static showAlert(message, className) {
    const div = document.createElement('div')
    div.className = `alert alert-${className}`
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector('.container')
    const form = document.querySelector('#book-form')
    container.insertBefore(div, form)
    // Wipe out in 3 seconds after showing
    setTimeout(() => {
      div.remove()
    }, 1500);
  }

  static clearFields() {
    const fields = document.querySelectorAll('input[type=text]')

    for (let field of fields){
      field.value = ''
    }
  }

  static deleteBook(element) {

    if(element.classList.contains('delete')){

        element.parentElement.parentElement.remove()

  }
}

}
// Local storage

class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books
  }

  static addBook(book){

    const books = Store.getBooks()

    books.push(book)

    localStorage.setItem('books', JSON.stringify(books))

  }

  static deleteBook(isbn){

    const books = Store.getBooks()

    books.forEach((book,index) => {
      if(book.isbn === isbn){
        books.splice(index, 1)
      }
    })
    localStorage.setItem('books', JSON.stringify(books))
  }
}



// Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Add new Book

document.getElementById('book-form').addEventListener('submit', (e) => {
  e.preventDefault()
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const isbn = document.getElementById('isbn').value

  if(title === '' || author === '' || isbn === ''){
    UI.showAlert("Please fill in all fields", "danger")
    return false
  }

  const book = new Book(title,author, isbn)

  UI.addBookToList(book)
  Store.addBook(book)
  UI.clearFields()
  UI.showAlert("Book has been added", "success")
})


// Delete book

document.getElementById('book-list').addEventListener('click', e => {
UI.deleteBook(e.target)
Store.deleteBook(e.target.parentElement.previousElementSibling.textContent)
UI.showAlert("Book has been deleted", "warning")
})
