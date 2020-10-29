class Book {
  constructor(title, author, isbn){
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}


class UI {
  static displayBooks(){
    const storedBooks = [{
      title: "Book One",
      author : "Jakub Koudela",
      isbn: '343434'
    },
    {
      title: "Book Two",
      author : "Ivanka Koudelova",
      isbn: '545454'
    }]
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



// Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Add new Book

document.getElementById('book-form').addEventListener('submit', (e) => {
  e.preventDefault()
  const title = document.getElementById('title').value
  const author = document.getElementById('author').value
  const isbn = document.getElementById('isbn').value

  const book = new Book(title,author, isbn)

  UI.addBookToList(book)
  UI.clearFields()
})


// Delete book

document.getElementById('book-list').addEventListener('click', e => {
UI.deleteBook(e.target)
})
