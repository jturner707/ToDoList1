"use strict";
/**
 * Represents an individual book that can be purchased.
 */
class Book {
}
/**
 * Book object test code
 */
let myBook = new Book();
myBook.isbn = "1234567890";
myBook.price = 9.99;
myBook.title = "Programming for Beginners";
myBook.releaseDate = new Date(2023, 9, 8); // Months are zero - indexed.
console.log(myBook);
window.onload = function () {
    // Set up button click for add book form
    let addBookBtn = document.querySelector("#add-book"); //#finds the tag, "as" casts the element
    addBookBtn.onclick = processBook;
};
function processBook() {
    console.log("processBook was called");
    // Validation
    let userBook = getBook();
    if (userBook != null) {
        addBook(userBook);
    }
}
/**
 * getBook will retrieve the book data from HTML
 * If all data is valid a Book object will be
 * returned.  If any data is invalid, null will
 * be returned and error messages will be shown
 * on the webpage.
 */
function getBook() {
    clearAllErrorMessages();
    // Get all inputs
    let isbnTextBox = document.querySelector("#isbn");
    let titleTextBox = document.querySelector("#title");
    let priceTextBox = document.querySelector("#price");
    let releaseDateTextBox = document.querySelector("#release-date");
    // Extract the data
    // Validate data
    let isValidData = true;
    //Validate ISBN
    let isbn = isbnTextBox.value; // value is always a string coming from a textbox
    // so declaring it with isbn:string is not required.
    if (!isValidIsbn(isbn)) {
        isValidData = false;
        isbnTextBox.nextElementSibling.textContent = "ISBN must be 13 digits only";
    }
    // This validates an ISBN 13 number.  Data is the isbn to be tested.
    function isValidIsbn(data) {
        const isbnRegex = /^\d{13}$/; // Simplified regex only checks for 13 numbers.                             
        return isbnRegex.test(data);
    }
    // Validate title
    let title = titleTextBox.value;
    if (title.trim() == '') {
        isValidData = false;
        let titleErrorSpan = titleTextBox.nextElementSibling;
        titleErrorSpan.textContent = "You must provide a title.";
    }
    // Validate price
    let price = parseFloat(priceTextBox.value);
    if (isNaN(price) || price < 0) {
        isValidData = false;
        priceTextBox.nextElementSibling.textContent = "Price must be a positive number.";
    }
    // Validate release date
    let releaseDate = releaseDateTextBox.value;
    // Attempt to parse the date string
    const timestamp = Date.parse(releaseDate);
    // If timestamp is NaN, the date is invalid
    if (isNaN(timestamp)) {
        isValidData = false;
        releaseDateTextBox.nextElementSibling.textContent = "Release date must be a valid date.";
    }
    if (isValidData) {
        // Create and populate Book object if all data is valid.
        let addedBook = new Book();
        addedBook.isbn = isbn;
        addedBook.price = price;
        addedBook.title = title;
        addedBook.releaseDate = new Date(releaseDate);
        return addedBook;
    }
    else {
        return null; // return null if any invalid data
    }
}
/**
 * Adds a Book object to web storage.  Assumes all
 * data is valid.  Inside parenthesis is parameter
 * and variable name.  :void is return type.
 * @param b
 */
function addBook(b) {
    alert("Data was valid, book added");
    console.log(b);
}
function clearAllErrorMessages() {
    // Get all error spans.
    let allSpans = document.querySelectorAll("form span.error-msg");
    // Loop through and set each span to an empty string.
    // Lambda function inside allSpans.forEach() 
    allSpans.forEach(someSpan => someSpan.textContent = "");
    // for(let i = 0; i< allSpans.length; i++) {
    //      let currentSpan = allSpans[i];
    //      currentSpan.textContent = '';
    // }
}
