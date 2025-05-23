import { async } from "regenerator-runtime";

function main() {

  // const getBook = () => {
  //   // tuliskan kode di sini!
  //   const xhr = new XMLHttpRequest();

  //   xhr.onload = function(){
  //     const responseJson = JSON.parse(this.responseText);
  //     console.log(responseJson.books);

  //     if(responseJson.error){
  //       showResponseMessage(responseJson.message);
  //     } else {
  //       renderAllBooks(responseJson.books);
  //     }
  //   };

  //   xhr.onerror = function(){
  //     showResponseMessage();
  //   };

  //   xhr.open('GET', 'https://books-api.dicoding.dev/list');

  //   xhr.send();
  // };
  
  const getBook = async () => {
    try {
      const response = await fetch('https://books-api.dicoding.dev/list');
      const data = await response.json();
      
      if(data.error){
        showResponseMessage(data.message);
      } else {
        renderAllBooks(data.books);
      }    } catch(error){
      showResponseMessage(error);
    }
  };

  // const insertBook = (book) => {
  //   const xhr = new XMLHttpRequest();

  //   xhr.onload = function(){
  //     const responseJson = JSON.parse(this.responseText);
  //     showResponseMessage(responseJson.message);
  //     getBook();
  //   };

  //   xhr.onerror = function(){
  //     showResponseMessage();
  //   };

  //   xhr.open('POST', 'https://books-api.dicoding.dev/add');

  //   xhr.setRequestHeader('Content-Type', 'application/json');
  //   xhr.setRequestHeader('X-Auth-Token', '12345');

  //   xhr.send(JSON.stringify(book))

  // };

  const insertBook = async (book) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': '12345',
        },
        body: JSON.stringify(book),
      };

      const response = await fetch('https://books-api.dicoding.dev/add', options);
      const data = await response.json();
      showResponseMessage(data.message);
      getBook();

    } catch(error) {
      showResponseMessage(error);
    }
  };

  // const updateBook = (book) => {
  //   // tuliskan kode di sini!
  //   const xhr = new XMLHttpRequest();
 
  //   // Menetapkan callback jika response sukses dan error
  //   xhr.onload = function () {
  //     const responseJson = JSON.parse(this.responseText);
  //     showResponseMessage(responseJson.message);
  //     getBook();
  //   };
 
  //   xhr.onerror = function () {
  //     showResponseMessage();
  //   };
 
  //   // Membuat PUT request dan menetapkan target URL
  //   xhr.open('PUT', `https://books-api.dicoding.dev/edit/${book.id}`);
 
  //   // Menetapkan properti Content-Type dan X-Auth-Token pada Header request
  //   xhr.setRequestHeader('Content-Type', 'application/json');
  //   xhr.setRequestHeader('X-Auth-Token', '12345');
 
  //   // Mengirimkan request dan menyisipkan JSON.stringify(book) pada body
  //   xhr.send(JSON.stringify(book));
  // };

  const updateBook = async (book) => {
    try {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': '12345',
        },
        body: JSON.stringify(book),
      };

      const response = await fetch(`https://books-api.dicoding.dev/edit/${book.id}`, options);
      const data = await response.json();
      showResponseMessage(data.message);
      getBook();

    } catch(error) {
      showResponseMessage(error);
    }
  };

  // const removeBook = (bookId) => {
  //   // tuliskan kode di sini!
  //   const xhr = new XMLHttpRequest();
 
  //   // Menetapkan callback jika response sukses dan error
  //   xhr.onload = function () {
  //     const responseJson = JSON.parse(this.responseText);
  //     showResponseMessage(responseJson.message);
  //     getBook();
  //   };
 
  //   xhr.onerror = function () {
  //     showResponseMessage();
  //   };
 
  //   // Membuat PUT request dan menetapkan target URL
  //   xhr.open('DELETE', `https://books-api.dicoding.dev/delete/${bookId}`);
 
  //   // Menetapkan properti Content-Type dan X-Auth-Token pada Header request
  //   // xhr.setRequestHeader('Content-Type', 'application/json');
  //   xhr.setRequestHeader('X-Auth-Token', '12345');
 
  //   // Mengirimkan request dan menyisipkan JSON.stringify(book) pada body
  //   xhr.send();
  // };

  const removeBook = async (bookId) => {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'X-Auth-Token': '12345',
        }
      };

      const response = await fetch(`https://books-api.dicoding.dev/delete/${bookId}`, options);
      const data = await response.json();
      showResponseMessage(data.message);
      getBook();

    } catch(error) {
      showResponseMessage(error)
    }
  }


  
  
  
  
  /*
      jangan ubah kode di bawah ini ya!
  */

  const renderAllBooks = (books) => {
    const listBookElement = document.querySelector('#listBook');
    listBookElement.innerHTML = '';

    books.forEach(book => {
      listBookElement.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
          <div class="card">
            <div class="card-body">
              <h5>(${book.id}) ${book.title}</h5>
              <p>${book.author}</p>
              <button type="button" class="btn btn-danger button-delete" id="${book.id}">Hapus</button>
            </div>
          </div>
        </div>
      `;
    });

    const buttons = document.querySelectorAll('.button-delete');
    buttons.forEach(button => {
      button.addEventListener('click', event => {
        const bookId = event.target.id;
        
        removeBook(bookId);
      });
    });
  };

  const showResponseMessage = (message = 'Check your internet connection') => {
    alert(message);
  };

  document.addEventListener('DOMContentLoaded', () => {

    const inputBookId = document.querySelector('#inputBookId');
    const inputBookTitle = document.querySelector('#inputBookTitle');
    const inputBookAuthor = document.querySelector('#inputBookAuthor');
    const buttonSave = document.querySelector('#buttonSave');
    const buttonUpdate = document.querySelector('#buttonUpdate');

    buttonSave.addEventListener('click', function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value
      };
      
      insertBook(book);
    });

    buttonUpdate.addEventListener('click', function () {
      const book = {
        id: Number.parseInt(inputBookId.value),
        title: inputBookTitle.value,
        author: inputBookAuthor.value
      };

      updateBook(book);
    });
    getBook();
  });
}

export default main;