import React from 'react';
import './addbook.css'

export function AddBook() {
  return (
    <main className="container-fluid bg-light vh-100">
      <h1>Add a Book</h1>
      <form method="get" action="index.html">
        <div className="addbook form-group">
          <label>Insert Book Name: </label>
          <input className="form-control" type="text" placeholder="Book Name Here" />
        </div>
        <div className="addbook form-group">
          <label>Author Name: </label>
          <input className="form-control" type="text" placeholder="Author Name Here" />
        </div>
        <div className="addbook form-group">
            <label>Page Count: </label>
            <input className="form-control" type="number" id="page" placeholder="Enter Page Count" />
        </div>
        <div className="ratingdesc">
            <p>1 = I do NOT like this book.</p>
            <p>2 = I would not recommend this book.</p>
            <p>3 = This book was about average.</p>
            <p>4 = I liked this book!</p>
            <p>5 = I LOVED this book!</p>
        </div>
        <div className="rating">
            <label for="review" className="form-label">Review out of 5: </label>
            <input type="range" className="form-range" id="review" min="0" max="5" placeholder="Enter Review Here" />
        </div>
        <div className="ratingbutton">
            <button className="btn btn-primary" type="submit">Submit</button>
            <button className="btn btn-secondary" type="submit">Cancel</button>
        </div>
      </form>
    </main>
  );
}