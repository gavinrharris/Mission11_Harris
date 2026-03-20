export interface Book {
  bookID: number;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  classification: string;
  category: string;
  pageCount: number;
  price: number;
}

export interface BooksResponse {
  books: Book[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
