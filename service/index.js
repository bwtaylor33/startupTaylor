const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  console.log('creating user');
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.firstName, req.body.lastName, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    DB.updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// GetBooks
apiRouter.get('/books', async (_req, res) => {
  const books = await DB.getBooks();
  res.send(books);
});

// GetBookshelf
apiRouter.get('/bookshelf', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  //console.log("getting shelf for ", user.email);
  const bookshelf = await DB.getBookshelf(user);
  //console.log("getting bookshelf for user: ", bookshelf);
  res.send(bookshelf);
});

async function userHasReadBook(user, book) {
  const hasRead = await DB.userHasRead(user, book);
  if (hasRead) {
    console.log(user.email, " has read ", book.title);
  }else {
    console.log(user.email, " has not read ", book.title);
  }
  return hasRead;
}

// GetRecommendations
apiRouter.get('/recommendations', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  //console.log("getting recommendation for ", user.email);
  let recommendation = null;
  const books = await DB.getBooks();
  for (const [i, book] of books.entries()) {
    const hasRead = await userHasReadBook(user, book);
    if (!hasRead && (recommendation === null || book.rating > recommendation.rating)) {
      recommendation = book;
    }
  }
  const recommendations = [];
  if (recommendation !== null) {
    recommendations.push(recommendation);
  }
  console.log("recommending for user: ", recommendations);
  res.send(recommendations);
});

// AddBook
apiRouter.post('/books', verifyAuth, async (req, res) => {
  console.log("starting addBook")
  const user = await findUser('token', req.cookies[authCookieName]);
  console.log("found user: ", user);
  books = await updateBooks(user, req.body);
  console.log("updated books: ", books);
  res.send(books);
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// updateBooks adds a new book to the library
async function updateBooks(user, newBook) {
  let found = false;
  const books = await DB.getBooks();
  console.log("updating books with ", newBook);
  for (const [i, prevBook] of books.entries()) {
    if (newBook.isbn === prevBook.isbn) {
      found = true;
      console.log("updating avg rating for book in lib.");
      prevBook.rating = ((newBook.rating + prevBook.rating * prevBook.ratingWeight) / (prevBook.ratingWeight + 1)).toFixed(1);
      prevBook.ratingWeight++;
      DB.updateBook(prevBook);
      break;
    }
  }

  if (!found) {
    newBook.ratingWeight = 1;
    await DB.addBook(newBook);
    console.log("book added to books collection");
  }
  console.log("updating bookshelf with ", newBook);
  console.log("user: ", user);
  const bookshelf = await DB.getBookshelf(user);
  found = false;
  for (const [i, prevBook] of bookshelf.entries()) {
    if (newBook.isbn === prevBook.isbn) {
      found = true;
      break;
    }
  }
  if (found) {
    console.log("book has been found at bookshelf");
  }else {
    console.log("book has not been found");
  }
  if (!found) {
    DB.addBookshelf(user, newBook);
    console.log("new book added to bookshelf for ", user);
  }
  books = await DB.getBooks();
  return books;
}

async function createUser(email, firstName, lastName, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: passwordHash,
    token: uuid.v4(),
  };

  await DB.addUser(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
