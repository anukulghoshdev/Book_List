// Get this UI elements
let form = document.querySelector('#book-form');
let booklist = document.querySelector('#book-list');




// Book class
class Book {

    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

}

// UI class

class UI {

    // constructor(title, author, isbn) {

    // }
    static addBooklist(book) {
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `
        list.appendChild(row);
    }
    static clearField() {
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }

    static showAlert(message, className) { // error class name ta className e asbe
        let div = document.createElement('div');
        div.className = `alert ${className}`; // aler + error name e ekta class create hobe , (alert)eta holo skeleton css er buildin ekta class
        div.appendChild(document.createTextNode(message));


        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');

        container.insertBefore(div, form); //container er vitor  div ta ke add korlam form er agy

        setTimeout(function () {
            document.querySelector('.alert').remove(); //alert or error cls dhore o call korte parbo
        },2000);
    }



    static deleteFromBooklist(target) {
        if (target.hasAttribute('href')) {
            target.parentElement.parentElement.remove();

            store.removeBookFromLS(target.parentElement.previousElementSibling.textContent.trim());
            
            UI.showAlert('Book Removed!', 'success');
        }
    }
    
}


//local storage class
class store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addbook(book) {
        let books = store.getBooks();
        books.push(book);//books array te book ta push kora holo ekhane

        localStorage.setItem('books',JSON.stringify(books))//localstorage e json format(json string) e save hoy
    }

    //display localStorage data in browser 
    static displayBooks() {
        let books = store.getBooks();
        books.forEach(function (book) {
            UI.addBooklist(book);
        });
    }

    static removeBookFromLS(isbn) {
        let books = store.getBooks();
        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }

        });
        localStorage.setItem('books', JSON.stringify(books));
    }

    

}
//Add Event Listener
form.addEventListener('submit', newbook);
booklist.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded',store.displayBooks());





// Define Function
function newbook(e) {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let isbn = document.querySelector('#isbn').value;

    // let ui = new UI();

    if (title === '' || author === '' || isbn === '' ) {
        // alert('All Fields must be Filled!');
        UI.showAlert("Please Fill all the fields!", "error");   
    }
    else {
        let book = new Book(title, author, isbn);
        // console.log(book);
        
        UI.addBooklist(book);
    
        UI.clearField();

        UI.showAlert("Book Added!", "success");

        store.addbook(book);
    }

    e.preventDefault();
}

function removeBook(e) {
    // let ui = new UI();
    UI.deleteFromBooklist(e.target);
    // ui.showAlert("Book Removed!", "success");

    e.preventDefault();
}



// static function topic: kono fun k static hisbe difine kori tahole tar obj create kora lage na , direct fun thke call kora jay 



// store in local storage
// function storeTaskInLocalStorage(task) {
//     let tasks;
//     if (localStorage.getItem('tasks') === null) { //localStorage.getItem(keyname)
//         tasks = [];
//     } else {
//         tasks = JSON.parse(localStorage.getItem('tasks'));
//     }
//     tasks.push(task);

//     localStorage.setItem('tasks', JSON.stringify(tasks));  //localStorage.setItem(keyname, value)
// }
