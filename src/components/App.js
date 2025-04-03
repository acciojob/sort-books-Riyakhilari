import React, { useEffect, useState } from "react";
import "./../styles/App.css";
import Api from "../../config/Api.js";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../components/Books";
import "regenerator-runtime/runtime";
 
const App = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
 
  const [sortBy, setSortBy] = useState("Title");
  const [ordered, setOrdered] = useState("Ascending");
  const [sortedBooks, setSortedBooks] = useState([]);
 
  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await fetch(Api);
        const data = await response.json();
        console.log("API Response:", data);
        console.log("Books:", data.results?.books);
        dispatch(setBooks(data.results?.books || []));
      } catch (error) {
        console.log("Error fetching books:", error);
      }
    };
 
    getBooks();
  }, [dispatch]);
 
  useEffect(() => {
    if (books.length > 0) {
      let sortedArray = [...books];
      if (sortBy === "Title") {
        sortedArray.sort((a, b) =>
          ordered === "Ascending"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        );
      } else if (sortBy === "Author") {
        sortedArray.sort((a, b) =>
          ordered === "Ascending"
            ? a.author.localeCompare(b.author)
            : b.author.localeCompare(a.author)
        );
      } else if (sortBy === "Publisher") {
        sortedArray.sort((a, b) =>
          ordered === "Ascending"
            ? a.publisher.localeCompare(b.publisher)
            : b.publisher.localeCompare(a.publisher)
        );
      }
      setSortedBooks(sortedArray);
    } else {
      setSortedBooks([]);
    }
  }, [sortBy, ordered, books]);
 
  return (
    <div>
      <h1>Books List</h1>
      <div style={{ display: "flex" }}>
        <div className="dropdown" style={{ marginRight: "10px" }}>
          <label htmlFor="sort-by">
            Sort by:
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Title">Title</option>
              <option value="Author">Author</option>
              <option value="Publisher">Publisher</option>
            </select>
          </label>
          <label htmlFor="order">
            Order:
            <select
              id="order"
              value={ordered}
              onChange={(e) => setOrdered(e.target.value)}
            >
              <option value="Ascending">Ascending</option>
              <option value="Descending">Descending</option>
            </select>
          </label>
        </div>
      </div>
 
      <div id="books">
        {sortedBooks.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th className="book_title">Title</th>
                <th className="book_author">Author</th>
                <th className="book_publisher">Publisher</th>
                <th className="book_ISBN">ISBN</th>
              </tr>
            </thead>
            <tbody>
              {sortedBooks.map((book, index) => (
                <tr key={index} className="book" style={{ height: "50px" }}>
                  <td className="book_title">{book.title}</td>
                  <td className="book_author">{book.author}</td>
                  <td className="book_publisher">{book.publisher}</td>
                  <td className="book_ISBN">{book.primary_isbn10}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};
 
export default App;
