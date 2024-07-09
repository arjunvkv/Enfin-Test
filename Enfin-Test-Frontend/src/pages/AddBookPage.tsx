import React, { useEffect, useState } from "react";
import axios from "axios";
import AddBookForm from "../components/AddBookForms";
import BookList from "../components/BookList";
import SearchBar from "../components/SearchBar";
import { Book } from "../interfaces/Book";
import { FormErrors } from "../interfaces/FormErrors";

const BASE_URL = "http://localhost:3030/book";

const AddBookPage: React.FC = () => {
  const [form, setForm] = useState<Partial<Book>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [books, setBooks] = useState<Book[]>([]);
  const [isEditId, setIsEditId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchBooks = async (search = "") => {
    try {
      const response = await axios.get(`${BASE_URL}/getAll`, {
        params: {
          search,
          page: 1,
          limit: 10,
        },
      });
      setBooks(response.data.books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const validateForm = (): FormErrors => {
    const { name, price, description, published_date } = form;
    const newErrors: FormErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!price) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(price))) {
      newErrors.price = "Invalid price";
    }
    if (!description) newErrors.description = "Description is required";
    if (!published_date) {
      newErrors.published_date = "Published date is required";
    } else if (isNaN(Date.parse(published_date))) {
      newErrors.published_date = "Invalid date";
    }
    return newErrors;
  };

  const formSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (isEditId) {
        await editBook();
        setIsEditId("");
      } else {
        await addBook();
      }
      setForm({});
      setErrors({});
      fetchBooks();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const addBook = async () => {
    const response = await axios.post(`${BASE_URL}/add`, form);
    console.log("Form submitted successfully:", response.data);
    return response.data;
  };

  const editBook = async () => {
    const response = await axios.put(`${BASE_URL}/edit`, form, {
      params: { id: isEditId },
    });
    console.log("Book edited successfully:", response.data);
    return response.data;
  };

  const deleteBook = async (id: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete`, {
        params: { id },
      });
      console.log("Book deleted successfully:", response.data);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const setEditForm = (book: Book) => {
    setForm(book);
    setIsEditId(book._id);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-900 text-white">
      <h1 className="text-3xl tracking-widest uppercase font-bold text-center mb-4">
        Library
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        <AddBookForm
          form={form}
          setForm={setForm}
          isEditId={isEditId}
          setIsEditId={setIsEditId}
          formSubmit={formSubmit}
          errors={errors}
        />
        <div className="w-full md:w-2/3 p-6 border border-gray-700 rounded-md shadow-md bg-gray-800">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={() => fetchBooks(searchQuery)}
          />
          <BookList
            books={books}
            setEditForm={setEditForm}
            deleteBook={deleteBook}
          />
        </div>
      </div>
    </div>
  );
};

export default AddBookPage;
