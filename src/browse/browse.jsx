import React from 'react';
import './browse.css';
import {initialLib} from './initialLib.js';

export function Browse() {
  const [books, setBooks] = React.useState([]);
  React.useEffect(() => {
    let booksText = localStorage.getItem('books');
    if (!booksText) {
      booksText = initialLib;
    }
    if (booksText) {
      setBooks(JSON.parse(booksText));
    }
  }, []);

  const bookRows = [];
  if (books.length) {
    for (const [i, book] of books.entries()) {
      bookRows.push(
        <tr key={i}>
          <td><img width="100" src={book.bookCoverImg}/></td>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.pageCount}</td>
          <td>{book.rating}</td>
        </tr>
      );
    }
  }

  return (
    <main className="container-fluid bg-light text-center vh-100">
      <h1>Browse Books</h1>
      <table className="table table-hover">
        <thead className="bg-secondary">
          <tr>
            <th></th>
            <th>Title</th>
            <th>Author</th>
            <th>Page Count</th>
            <th>Average Rating</th>
          </tr>
        </thead>
        <tbody id='books'>{bookRows}</tbody>
      </table>
      <p className="loadingmessage bg-light">Loading recently added books...</p>
    </main>
  );
}