import React from 'react';
import './addbook.css'
import {useNavigate} from 'react-router-dom';

export function AddBook() {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [pageCount, setPageCount] = React.useState(0);
  const [yourRating, setYourRating] = React.useState(0);
  
  const [books, setBooks] = React.useState([]);
  React.useEffect(() => {
    let booksText = localStorage.getItem('books');
    if (booksText) {
      setBooks(JSON.parse(booksText));
    }
  }, []);

  function addBook() {

    const newBook = {
      title: title,
      author: author,
      pageCount: pageCount,
      rating: yourRating,
      bookCoverImg: 'coverDefault.png'};
    const updatedBooks = [...books, newBook];
    localStorage.setItem('books', JSON.stringify(updatedBooks));
    setBooks(updatedBooks);
  };

  const handleSubmit = () => {
    addBook();
    setTitle('');
    setAuthor('');
    setPageCount(0);
    setYourRating(0);
    navigate('/browse');
  };

  const handleCancel = () => {
      navigate('/home');
  }

  return (
    <main className="container-fluid bg-light vh-100">
      <h1>Add a Book</h1>
      <form className="form-container">
        <div className="addbook form-group">
          <label>Insert Book Title: </label>
          <input className="form-control" type="text" placeholder="book title here" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className="addbook form-group">
          <label>Author Name: </label>
          <input className="form-control" type="text" placeholder="author name here" value={author} onChange={(e) => setAuthor(e.target.value)}/>
        </div>
        <div className="addbook form-group">
            <label>Page Count: </label>
            <input className="form-control" type="number" id="page" placeholder="enter page count" value={pageCount} onChange={(e) => setPageCount(Number(e.target.value))}/>
        </div>
        <div className="ratingdesc">
            <p>1 = I do NOT like this book.</p>
            <p>2 = I would not recommend this book.</p>
            <p>3 = This book was about average.</p>
            <p>4 = I liked this book!</p>
            <p>5 = I LOVED this book!</p>
        </div>
        <div className="rating">
            <label htmlFor="review" className="form-label">Review out of 5: </label>
            <input type="range" className="form-range" id="review" min="0" max="5" value={yourRating} onChange={(e) => setYourRating(Number(e.target.value))}/>
        </div>
        <div className="ratingbutton">
            <button className="btn btn-primary" type="button" onClick={handleSubmit}>Submit</button>
            <div className="divider"></div>
            <button className="btn btn-secondary" type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </main>
  );
}