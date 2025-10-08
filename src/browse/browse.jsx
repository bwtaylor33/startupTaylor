import React from 'react';
// import './browse.css'

export function Browse() {
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
        <tbody>
          <tr>
            <td><img width="100" src="GatsbyCover.jpg"/></td>
            <td>The Great Gatsby</td>
            <td>F. Scott Fitzgerald</td>
            <td>208</td>
            <td>4</td>
          </tr>
          <tr>
              <td><img width="100" src="HarryCover.jpg"/></td>
              <td>Harry Potter</td>
              <td>J.K. Rowling</td>
              <td>300</td>
              <td>4</td>
            </tr>
            <tr>
              <td><img width="100" src="HobbitCover.png"/></td>
              <td>The Hobbit</td>
              <td>J.R.R. Tolkein</td>
              <td>380</td>
              <td>5</td>
            </tr>
            <tr>
              <td><img width="100" src="PirateCover.jpg"/></td>
              <td>Pirate Pete</td>
              <td>Kim Kennedy</td>
              <td>30</td>
              <td>5</td>
            </tr>
        </tbody>
      </table>
      <p className="bg-light">Loading recently added books...</p>
    </main>
  );
}