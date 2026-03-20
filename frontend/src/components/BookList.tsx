import { useEffect, useState } from 'react';
import type { Book, BooksResponse } from '../types/Book';

const API_URL = 'https://localhost:7102/api/books';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [sortByTitle, setSortByTitle] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, [currentPage, pageSize, sortByTitle]);

  const fetchBooks = async () => {
    const sortParam = sortByTitle ? '&sortBy=title' : '';
    const response = await fetch(
      `${API_URL}?pageSize=${pageSize}&pageNum=${currentPage}${sortParam}`
    );
    const data: BooksResponse = await response.json();
    setBooks(data.books);
    setTotalPages(data.totalPages);
    setTotalItems(data.totalItems);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Hilton's Bookstore</h1>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <label className="me-2">Results per page:</label>
          {[5, 10, 15].map((size) => (
            <button
              key={size}
              className={`btn btn-sm me-1 ${pageSize === size ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handlePageSizeChange(size)}
            >
              {size}
            </button>
          ))}
        </div>
        <div>
          <button
            className={`btn btn-sm ${sortByTitle ? 'btn-success' : 'btn-outline-secondary'}`}
            onClick={() => {
              setSortByTitle(!sortByTitle);
              setCurrentPage(1);
            }}
          >
            {sortByTitle ? 'Sorting by Title ✓' : 'Sort by Title'}
          </button>
        </div>
      </div>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification</th>
            <th>Category</th>
            <th>Pages</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.bookID}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.isbn}</td>
              <td>{book.classification}</td>
              <td>{book.category}</td>
              <td>{book.pageCount}</td>
              <td>${book.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center">
        <span className="text-muted">
          Showing page {currentPage} of {totalPages} ({totalItems} total books)
        </span>
        <nav>
          <ul className="pagination mb-0">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                <button className="page-link" onClick={() => setCurrentPage(page)}>
                  {page}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default BookList;
