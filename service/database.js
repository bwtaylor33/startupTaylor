const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('novelty');
const userCollection = db.collection('user');
const booksCollection = db.collection('books');
const bookshelfCollection = db.collection('bookshelf');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function addBook(book) {
  return booksCollection.insertOne(book);
}

async function updateBook(book) {
  return booksCollection.updateOne({ isbn: book.isbn }, { $set: book });
}

async function addBookshelf(user, newBook) {
  //add to the user's bookshelf
  const newBookshelfItem = {
    title: newBook.title,
    isbn: newBook.isbn,
    author: newBook.author,
    pageCount: newBook.pageCount,
    rating: newBook.rating,
    bookCoverImg: newBook.bookCoverImg,
    user: user.email
  };
  return bookshelfCollection.insertOne(newBookshelfItem);
}

function getBooks() {
  const cursor = booksCollection.find();
  return cursor.toArray();
}

async function getBookshelf(user) {
  //console.log("getting bookshelf for user")
  const query = { user: user.email };
  //console.log("query = ", query);
  const bookshelf = await bookshelfCollection
    .find(query)
    .toArray();
  //console.log("bookshelf = ", bookshelf);
  return bookshelf;
  // const cursor = bookshelfCollection.find(query);
  // return cursor.toArray();
}

async function userHasRead(user, book) {
  const query = { user: user.email, isbn: book.isbn };
  const found = await bookshelfCollection.findOne(query);
  return found != null;
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  addBook,
  updateBook,
  getBooks,
  addBookshelf,
  getBookshelf,
  userHasRead
};
