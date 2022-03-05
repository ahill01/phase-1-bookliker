document.addEventListener("DOMContentLoaded", function() {
//grab containers
let booksList = document.querySelector("ul");
let detailDiv = document.querySelector("#show-panel");
let currentUser = {id: 11, username:"ahill"};
//global variables
const baseURL = `http://localhost:3000/books`;
let fetchedBooks

//DISPLAY A LIKE BUTTON ALONG W/ BOOK DETAIL

let likeBttn = document.createElement("button");
likeBttn.innerText = "like <3";
likeBttn.addEventListener(`click`,e => patchLikes(e))
//WHEN BUTTON IS CLICKED, SEND PATCH REQUEST TO THAT BOOK'S DB ENTRY WITH ARRAY OF USERS WHO LIKE THE BOOK, AND ADD NEW USR TO THE LIST
function patchLikes(book){
    let currentBook = document.querySelector("img").id;
    //let whoLikes = currentUser;
    console.log(`${baseURL}/${currentBook}`)
    debugger;
   fetch(`${baseURL}/${currentBook}`,{
       method:`PATCH`,
       headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(currentUser),
   })
    // )
    let newUserLi = document.createElement("li");
    newUserLi.innerText = currentUser["username"];
    detailDiv.querySelector("ul").append(newUserLi);
    console.log(`liked`);
}

//should be able to unlike 


    //GET A LIST OF BOOKS 
fetchBooks();

function fetchBooks() {
    console.log(`fetching`);
    fetchedBooks = fetch(baseURL)
    .then(booksJSON => booksJSON.json())
    .then(booksArr => renderBooksList(booksArr));
};

//DISPLAY BY CREATING LI, ADD TO UL#LIST
function renderBooksList(booksArr){
    // debugger;
    booksArr.forEach((book) => appendBook(book));
    
};

function appendBook(bookObj){
    // debugger;
    let bookLi = document.createElement("li");
    console.log(bookObj);
    bookLi.innerText = bookObj.title;
    bookLi.id = bookObj.id;
    bookLi.addEventListener(`click`,() => renderDetails(bookObj));
    booksList.appendChild(bookLi);
};

//SHOW DETAILS, DISPLAY THUMBNAIL, DESCRIPTION, LIST OF USERS IN DIV#SHOW
function renderDetails(bookObj){
    //debugger;
    fetch(`${baseURL}/${bookObj.id}`)
    .then(bookEntry => bookEntry.json())
    .then(book => {
        //debugger;
        detailDiv.innerHTML = ""
        let dImg = document.createElement("img");
        dImg.src = book.img_url;
        dImg.id = book.id;
        let dTitle = document.createElement("h2");
        dTitle.innerText = book.title;
        let dSubtitle = document.createElement("h2");
        dSubtitle.innerText = book.subtitle;
        let dAuthor = document.createElement("h2");
        dAuthor.innerText = book.author;
        let dDesc = document.createElement("p");
        dDesc.innerText = book.description; 
        let userLikes = document.createElement("ul");
        for(user of book["users"]) {
            let userLi = document.createElement("li");
            userLi.innerText = user["username"];
            userLikes.append(userLi);
        };
    
        detailDiv.append(dImg,dTitle,dSubtitle,dAuthor,dDesc,userLikes,likeBttn);
        
    });
    console.log(`${bookObj.title} has been clicked`);
    //debugger;
}





});
