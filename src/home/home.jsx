import React from 'react';
import './home.css'
import {initialLib} from '../browse/initialLib.js';
import {readBooks} from './readBooks.js';
import {recBooks} from './recBooks';


export function Home(props) {

        const [readList, setRead] = React.useState([]);
        React.useEffect(() => {
            let readText = localStorage.getItem('readBooks');
            if (!readText) {
                readText = readBooks;
            }
            if (readText) {
                setRead(JSON.parse(readText));
            }
        },[]);

        const [recList, setRecs] = React.useState([]);
        React.useEffect(() => {
            let recText = localStorage.getItem('recBooks');
            if (!recText) {
                recText = recBooks;
            }
            if (recText) {
                setRecs(JSON.parse(recText));
            }
        },[]);
      

        const readRows = [];
        if (readList.length) {
          for (const [i, read] of readList.entries()) {
            readRows.push(
              <tr key={i}>
                <td><img width="100" src={read.bookCoverImg}/></td>
                <td>{read.title}</td>
                <td>{read.author}</td>
                <td>{read.pageCount}</td>
                <td>{read.yourRating}</td>
              </tr>
            );
          }
        }

        const recRows = [];
        if (recList.length) {
          for (const [i, rec] of recList.entries()) {
            recRows.push(
              <tr key={i}>
                <td><img width="100" src={rec.bookCoverImg}/></td>
                <td>{rec.title}</td>
                <td>{rec.author}</td>
                <td>{rec.pageCount}</td>
                <td>{rec.rating}</td>
              </tr>
            );
          }
        }

    return (
        <main className="container-fluid bg-light text-center vh-100 pb-5">
            <h1 className="home">
                <div className='userName'>Welcome, {props.userName}!</div>
            </h1>
            <h2 className="home" >Books You've Read: </h2>
            <table className="table table-hover">
                <thead className="bg-secondary">
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Page Count</th>
                        <th>Your Rating</th>
                    </tr>
                </thead>
                <tbody id='books'>{readRows}</tbody>
            </table>
            <h2 className="home">What We Recommend:</h2>
            <p className="home">
                Based on you past book reviews and other readers like you, we recommend to you these great books! We hope you enjoy them!
            </p>
            <table className="rectable table table-hover bg-light">
                <thead className="bg-secondary">
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Page Count</th>
                        <th>Average Rating</th>
                    </tr>
                </thead>
                <tbody id='books'>{recRows}</tbody>
            </table>
            <p className="rectable bg-light container-fluid"> </p>
        </main>
    );
}