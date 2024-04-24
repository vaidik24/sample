import { useState } from "react";
import "./App.css";

function App() {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [error, setError] = useState(false);

  const books = [
    { id: 1, title: "Harry Potter and the Philosopher's Stone" },
    { id: 2, title: "Harry Potter and the Chamber of Secrets" },
    { id: 3, title: "Harry Potter and the Prisoner of Azkaban" },
    { id: 4, title: "Harry Potter and the Goblet of Fire" },
    { id: 5, title: "Harry Potter and the Order of the Phoenix" },
  ];

  const handleToggleBook = (bookId) => {
    const isSelected = selectedBooks.includes(bookId);
    setSelectedBooks((prevSelected) =>
      isSelected
        ? prevSelected.filter((id) => id !== bookId)
        : [...prevSelected, bookId]
    );
    setError(false); // Reset error when a book is selected
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedBooks.length === 0) {
      setError(true);
    } else {
      setError(false);
      // Display confirmation dialog
      const confirmed = window.confirm("Thank you for selecting our books.");
      if (confirmed) {
        // Handle submission here, for example, you can log the selected books
        console.log("Selected Books:", selectedBooks);
        window.location.href = "/"; // Redirect to store page
      }
    }
  };

  return (
    <div>
      <h2>Choose from a wide variety of books</h2>
      <div
        className="error-container"
        style={{ display: error ? "block" : "none" }}
      >
        <p className="error-message">Please select at least one book</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="book-list">
          {books.map((book) => (
            <div key={book.id} className="book-item">
              <input
                type="checkbox"
                id={book.id}
                value={book.id}
                checked={selectedBooks.includes(book.id)}
                onChange={() => handleToggleBook(book.id)}
              />
              <label htmlFor={book.id}>{book.title}</label>
            </div>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
