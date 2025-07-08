const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 10: Function to get all books using async callback with Promise
function getAllBooks() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(books);
      } catch (error) {
        reject(error);
      }
    }, 100);
  });
}

// Task 11: Function to get book by ISBN using promises
function getBookByISBN(isbn) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (books[isbn]) {
          resolve(books[isbn]);
        } else {
          reject(new Error('Book not found'));
        }
      } catch (error) {
        reject(error);
      }
    }, 100);
  });
}

// Task 12: Function to get books by author using promises
function getBooksByAuthor(author) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let filtered_books = {};
        for (let key in books) {
          if (books[key].author === author) {
            filtered_books[key] = books[key];
          }
        }
        resolve(filtered_books);
      } catch (error) {
        reject(error);
      }
    }, 100);
  });
}

// Task 13: Function to get books by title using promises
function getBooksByTitle(title) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        let filtered_books = {};
        for (let key in books) {
          if (books[key].title === title) {
            filtered_books[key] = books[key];
          }
        }
        resolve(filtered_books);
      } catch (error) {
        reject(error);
      }
    }, 100);
  });
}

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  let filtered_books = {};

  for (let key in books) {
    if (books[key].author === author) {
      filtered_books[key] = books[key];
    }
  }

  res.send(filtered_books);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  let filtered_books = {};

  for (let key in books) {
    if (books[key].title === title) {
      filtered_books[key] = books[key];
    }
  }

  res.send(filtered_books);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

// Task 10: Get all books using async callback function
public_users.get('/async/books', async (req, res) => {
  try {

    const allBooks = await getAllBooks();
    res.status(200).json(allBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Task 11: Search by ISBN using Promises
public_users.get('/async/isbn/:isbn', (req, res) => {
  const isbn = req.params.isbn;

  getBookByISBN(isbn)
    .then(book => {
      res.status(200).json(book);
    })
    .catch(error => {
      res.status(404).json({ message: error.message });
    });
});

// Task 12: Search by Author using Promises
public_users.get('/async/author/:author', (req, res) => {
  const author = req.params.author;

  getBooksByAuthor(author)
    .then(books => {
      res.status(200).json(books);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

// Task 13: Search by Title using Promises
public_users.get('/async/title/:title', (req, res) => {
  const title = req.params.title;

  getBooksByTitle(title)
    .then(books => {
      res.status(200).json(books);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

module.exports.general = public_users;
