# NovelTy

[My Notes](notes.md)

Book reviewing website. Will require login so that it can track favorite books, save personal book ratings, and recommend new books based on what you and your friends enjoy. Users will be able browse a list of books and add their personal reviews of them. 


> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Are you tired of searching endlessly for a good book to read? Why not just use NovelTy? We will track the books you and your like so you will spend less time searching for a book, and more time reading a new favorite! And if you want to try something new, we have a full database of books to browse. NovelTy's purpose is to get you reading more of what you like!

### Design

![Design image](startupbook.jpeg)

Here is a sequence diagram showing the user logging into the home page, thus seeing his bookshelf and top recommendations:

![Design image](sequence.jpeg)

### Key features

- User login for security
- Database of books with their page number, genre, and overall review
- Allows you to rate books and track which books you have read
- Recommends new books based on friends and your collection of favorite books

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Used for structure. Will need separate pages. Will have a Registry Page, Home Page, Add Book Page, and a Browsing Page
- **CSS** - Used for decorating each page. Used to make a responsive layout for all viewports. Create grid for book selection.
- **React** - show homepage, buttons to add a book, browse library
- **Service** - Backend service with endpoints for: Registering logins, creating user profiles, validating logins, create new reviews, fetch bookshelf, get recommendations for users
- **DB/Login** - Stores users, books, reviews. Register and login users. Need to have authenticated login to leave a review.
- **WebSocket** - As new book is added to the shelf from a different login, it will be added automatically to the other user's shelf without refreshing.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Server deployed and accessible with custom domain name** - [My server link](https://brycetaylor.link).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **HTML pages** - I have 5 separate pages that are used in the website. Home (index), AddBook, Register, Login, and Browse
- [X] **Proper HTML element usage** - I used the many input elements in the addBook.html, including the range, number, and text inputs. browse.html contains tables that have images inseerted as well. Link elements are placed in both the header and footer of each page.
- [X] **Links** - The header on top of each page allows you to navigate. Register takes you to login, and login will take you to the home page.
- [X] **Text** - I have multiple pieces of text throughout the website.
- [X] **3rd party API placeholder** - I will use a third party API image library to source the images for my book covers.
- [X] **Images** - The book covers in both the browse.html and index.html all use images.
- [X] **Login placeholder** - My login.html is the placeholder for this. It has user input that after entering sends you to the home page.
- [X] **DB data placeholder** - The 4 books are a placeholder for the database that will hold all of that information :)
- [X] **WebSocket placeholder** - The "loading books..." is a placeholder for when other users at new books to the database

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Header, footer, and main content body** - Added fixed header, fixed footer, and responsive body.
- [X] **Navigation elements** - Used bootstrap navbar for responsive navigation
- [X] **Responsive to window resizing** - I love bootstrap
- [X] **Application elements** - Added styles to tables, inputs, and buttons
- [X] **Application text content** - Added new font and styling to all text.
- [X] **Application images** - Images centered in tables

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Bundled using Vite** - done
- [X] **Components** - Addbook, Login, Register, Home, and Browse components were all created from previous html files.
- [X] **Router** - Top navigation was updated to use the react router. Buttons have not yet been converted.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **All functionality implemented or mocked out** - All buttons and routes are functioning. Have simulations of service calls by use of localStorage.
- [X] **Hooks** - Added timer to simulate new data from a Web Hook. Used useState and useEffect.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Node.js/Express HTTP service** - node.js and Express service that has an in'memory storage of book database and user bookshelves
- [X] **Static middleware for frontend** - Elements from previous deliverable still present. Removed localStorage and replaced with API calls
- [X] **Calls to third party endpoints** - Using Google Books API to search for a book they've read and want to rate.
- [X] **Backend service endpoints** - All user attributes, book database, and bookshelf data are stored in the back end.
- [X] **Frontend calls service endpoints** - Books are displayed from the back end to both the personal bookshelf on the home page and in the unauthenticated browse page.
- [X] **Supports registration, login, logout, and restricted endpoint** - All are working and functioning! Register is only visible when unauthorized, and add book is only visible when logged in.


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Stores data in MongoDB** - all 3 data storages moved to mongoDB. Users, books, bookshelves.
- [X] **Stores credentials in MongoDB** - done!

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [X] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [X] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [X] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [X] **Application is fully functional** - I did not complete this part of the deliverable.
