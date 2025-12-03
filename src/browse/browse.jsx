import React from 'react';

export function Browse() {
  const [books, setBooks] = React.useState([]);

  React.useEffect(() => {
    //create websocket connection
    const port = window.location.port;
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);

    socket.onmessage = async (msg) => {
      try {
        //console.log("received message, about to parse");
        const book = JSON.parse(await msg.data);
        //console.log("adding book from socket: ", book);
        setBooks(prev => [...prev, book])
      } catch (error) {
        console.log("error: ", error);
      }
    };
  }, []);

  React.useEffect(() => {
    //load books collection
    fetch('/api/books')
      .then((response) => response.json())
      .then((books) => {
        setBooks(books);
      });
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
    </main>
  );
}