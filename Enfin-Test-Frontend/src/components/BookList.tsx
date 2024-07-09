import React from "react";
import { Book } from "../interfaces/Book";
import BookItem from "./BookItem";

interface BookListProps {
  books: Book[];
  setEditForm: (book: Book) => void;
  deleteBook: (id: string) => void;
}

const BookList: React.FC<BookListProps> = ({
  books,
  setEditForm,
  deleteBook,
}) => {
  return (
    <div className="space-y-4">
      {books.map((book) => (
        <BookItem
          key={book._id}
          book={book}
          setEditForm={setEditForm}
          deleteBook={deleteBook}
        />
      ))}
    </div>
  );
};

export default BookList;
