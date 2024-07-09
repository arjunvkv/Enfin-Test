import React from "react";
import { Book } from "../interfaces/Book";

interface BookItemProps {
  book: Book;
  setEditForm: (book: Book) => void;
  deleteBook: (id: string) => void;
}

const BookItem: React.FC<BookItemProps> = ({
  book,
  setEditForm,
  deleteBook,
}) => (
  <div key={book._id} className="bg-gray-800 shadow-md rounded-md p-4">
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-lg font-semibold text-white">{book.name}</h2>
      <div className="flex gap-3">
        <button
          onClick={() => setEditForm(book)}
          className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded-md"
        >
          Edit
        </button>
        <button
          onClick={() => deleteBook(book._id)}
          className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
    <p className="text-gray-400 mb-2">Price: ${book.price}</p>
    <p className="text-gray-400 mb-2">Published Date: {book.published_date}</p>
    <p className="text-gray-400 mb-2">Description: {book.description}</p>
  </div>
);

export default BookItem;
