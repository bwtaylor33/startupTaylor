import React from 'react';
import './home.css'

export function Home() {
  return (
    <main className="container-fluid bg-light text-center vh-100 pb-5">
        <h1 className="home" >Welcome, Bryce!</h1>
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
            </tbody>
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
            <tbody>
                <tr>
                    <td><img width="100" src="HobbitCover.png"/></td>
                    <td>The Hobbit</td>
                    <td>J.R.R. Tolkien</td>
                    <td>380</td>
                    <td>5</td>
                </tr>
            </tbody>
        </table>
        <p className="rectable bg-light container-fluid"> </p>
    </main>
  );
}