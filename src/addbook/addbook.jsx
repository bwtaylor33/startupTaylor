import React from 'react';
import './addbook.css'
import {useNavigate} from 'react-router-dom';

export function AddBook() {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [isbn, setISBN] = React.useState('');
  const [pageCount, setPageCount] = React.useState(0);
  const [bookCoverImg, setBookCoverImg] = React.useState('');
  const [searchTitle, setSearchTitle] = React.useState('');
  const [searchAuthor, setSearchAuthor] = React.useState('');
  const [yourRating, setYourRating] = React.useState(0);
  
  const [books, setBooks] = React.useState([]);
  const [coverArtOptions, setCoverArtOptions] = React.useState([]);
  // const [coverArtRows, setCoverArtRows] = React.useState([]);


  React.useEffect(() => {
    let booksText = localStorage.getItem('books');
    if (booksText) {
      setBooks(JSON.parse(booksText));
    }
  }, []);

  // async function saveScore(score) {
  //   const date = new Date().toLocaleDateString();
  //   const newScore = { name: userName, score: score, date: date };

  //   await fetch('/api/score', {
  //     method: 'POST',
  //     headers: { 'content-type': 'application/json' },
  //     body: JSON.stringify(newScore),
  //   });

  //   // Let other players know the game has concluded
  //   GameNotifier.broadcastEvent(userName, GameEvent.End, newScore);
  // }

  async function addBook() {
    const newBook = {
      title: title,
      author: author,
      pageCount: pageCount,
      rating: yourRating,
      bookCoverImg: bookCoverImg};
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    await fetch('/api/books', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newBook),
    });    
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

  // async function handleCover() {
  //   const q = `intitle:${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}`;
  //   const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=5`;
  //   fetch('url', {
  //     method: 'GET',
  //     headers: { 'content-type': 'application/json' }
  //   })
  //   .then((response) => response.json())
  //   .then((coverArtOptions) => {
  //     setCoverArtOptions(coverArtOptions);
  //   });
  // }

  async function handleCover() {
    try {
      const q = `intitle:${encodeURIComponent(searchTitle)}+inauthor:${encodeURIComponent(searchAuthor)}`;
      console.log("q = ", q);
      const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=5`;
      console.log("url = ", url);
  
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
    
      if (!response.ok) {
        throw new Error(`Google Books API error: ${response.status}`);
      }
    
      const data = await response.json();
    
      const coverArtOptions = (data.items || []).map(item => {
        const info = item.volumeInfo;
        return {
          title: info.title,
          author: info.authors[0],
          thumbnail: info.imageLinks?.thumbnail,
          isbn: info.industryIdentifiers?.find(i => i.type === 'ISBN_13')?.identifier,
          pageCount: info.pageCount
        };
      });
    
      setCoverArtOptions(coverArtOptions); // your state setter
      console.log(coverArtOptions);
    } catch (err) {
      console.error('Error fetching cover art:', err);
    }
  }

  const coverArtCols = [];
  if (coverArtOptions.length) {
    for (const [i, coverArt] of coverArtOptions.entries()) {
      coverArtCols.push(
          <td data-id={i}><img width='50' src={coverArt.thumbnail} onClick={()=>{
            setTitle(coverArt.title);
            setAuthor(coverArt.author);
            setISBN(coverArt.isbn);
            setPageCount(coverArt.pageCount);
            setBookCoverImg(coverArt.thumbnail);
          }} /></td>
      );
    }
  }
  console.log("cover art: ", coverArtCols);  

  return (
    <main className="container-fluid bg-light vh-100">
      <h1>Find Your Book</h1>
      <form className="form-container">
        <div className="addbook form-group">
          <label>Book Title: </label>
          <input className="form-control" type="text" placeholder="book title here" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)}/>
        </div>
        <div className="addbook form-group">
          <label>Author Name: </label>
          <input className="form-control" type="text" placeholder="author name here" value={searchAuthor} onChange={(e) => setSearchAuthor(e.target.value)}/>
        </div>
        <div className='ratingbutton'>
          <button className="btn btn-primary" type="button" onClick={handleCover}>Search</button>
        </div>
        <table className="table">
          <tbody id='coverart'><tr>{coverArtCols}</tr></tbody>
        </table>
        <div>
          <table>
            <tr><td>Title:</td><td>{title}</td></tr>
            <tr><td>ISBN:</td><td>{isbn}</td></tr>
            <tr><td>Author:</td><td>{author}</td></tr>
            <tr><td>Page Count:</td><td>{pageCount}</td></tr>
          </table>
        </div>
        <div id="stage2">
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
        </div>
      </form>
    </main>
  );
}