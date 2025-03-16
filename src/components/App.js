import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, sortBooks } from "./redux/actions";
import "./styles/App.css";

const App = () => {
  const dispatch = useDispatch();
  const { books, loading, error, sortBy, order } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleSortChange = (e) => {
    dispatch(sortBooks(e.target.value, order));
  };

  const handleOrderChange = (e) => {
    dispatch(sortBooks(sortBy, e.target.value));
  };

  return (
    <div className="app-container">
      <h1>NYT Books</h1>
      <div className="sorting-controls">
        <label>Sort By: </label>
        <select onChange={handleSortChange} value={sortBy}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>
        <label>Order: </label>
        <select onChange={handleOrderChange} value={order}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.isbn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
