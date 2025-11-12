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
  const [coverArtOptions, setCoverArtOptions] = React.useState([]);

  async function addBook() {
    const newBook = {
      title: title,
      isbn: isbn,
      author: author,
      pageCount: pageCount,
      rating: yourRating,
      bookCoverImg: bookCoverImg};

    await fetch('/api/books', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newBook),
    });    
  };

  const handleSubmit = async () => {
    await addBook();
    setTitle('');
    setAuthor('');
    setPageCount(0);
    setYourRating(0);
    navigate('/home');
  };

  const handleCancel = () => {
    setTitle('');
    setAuthor('');
    setPageCount(0);
    setYourRating(0);
    navigate('/home');
  }

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
        let isbn = info.industryIdentifiers?.find(i => i.type === 'ISBN_13')?.identifier;
        console.log("Item id = ", item.id);
        if (isbn === undefined) {
          isbn = info.industryIdentifiers?.find(i => i.type === 'ISBN_10')?.identifier;
        }
        if (isbn === undefined) {
          isbn = "Google ID: " + item.id;
        }
        console.log("isbin = ", isbn);
        return {
          title: info.title,
          author: info.authors[0],
          thumbnail: info.imageLinks?.thumbnail,
          isbn: isbn,
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
          <li className="coverArtCols" key={i}><img width='50' src={coverArt.thumbnail} onClick={()=>{
            setTitle(coverArt.title);
            setAuthor(coverArt.author);
            setISBN(coverArt.isbn);
            setPageCount(coverArt.pageCount);
            setBookCoverImg(coverArt.thumbnail);
          }} /></li>
      );
    }
  }
  console.log("cover art: ", coverArtCols);  

  return (
    <main className="container-fluid bg-light vh-100">
      <h2>Find Your Book</h2>
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
          <button className="btn btn-primary" type="button" onClick={handleCover} disabled={searchTitle === "" || searchAuthor === ''}>Search</button>
        </div>
        <ul className="list-group list-group-horizontal">
          {coverArtCols}
        </ul>
        <div>
          <table className="table table-bordered">
            <tr><td>Title:</td><td>{title}</td></tr>
            <tr><td>ISBN:</td><td>{isbn}</td></tr>
            <tr><td>Author:</td><td>{author}</td></tr>
            <tr><td>Page Count:</td><td>{pageCount === 0 ? "" : pageCount}</td></tr>
          </table>
        </div>
        <div>
          <h2 className="text-center">Submit Rating</h2>
          <div className="ratingdesc">
              <li>1 = I do NOT like this book.</li>
              <li>2 = I would not recommend this book.</li>
              <li>3 = This book was about average.</li>
              <li>4 = I liked this book!</li>
              <li>5 = I LOVED this book!</li>
          </div>
          <div className="rating">
              <label htmlFor="review" className="form-label">Your Rating (1-5): </label>
              <input type="range" className="form-range" id="review" min="1" max="5" value={yourRating} onChange={(e) => setYourRating(Number(e.target.value))}/>
          </div>
          <div className="ratingbutton">
              <button className="btn btn-primary" type="button" onClick={handleSubmit} disabled={title === ''}>Submit</button>
              <div className="divider"></div>
              <button className="btn btn-secondary" type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </form>
    </main>
  );
}