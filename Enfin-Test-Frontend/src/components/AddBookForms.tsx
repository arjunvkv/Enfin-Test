import React, { ChangeEvent, useState } from "react";
import { Book } from "../interfaces/Book";
import { FormErrors } from "../interfaces/FormErrors";

interface AddBookFormProps {
  form: Partial<Book>;
  setForm: React.Dispatch<React.SetStateAction<Partial<Book>>>;
  isEditId: string;
  setIsEditId: React.Dispatch<React.SetStateAction<string>>;
  formSubmit: () => void;
  errors: FormErrors;
}

const AddBookForm: React.FC<AddBookFormProps> = ({
  form,
  setForm,
  isEditId,
  formSubmit,
  errors,
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="w-full md:w-1/3 p-6 border border-gray-700 rounded-md shadow-md bg-gray-800">
      <h2 className="text-2xl mb-4">{isEditId ? "Edit Book" : "Add Book"}</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="block mb-1">Name</label>
          <input
            name="name"
            onChange={handleChange}
            value={form.name || ""}
            type="text"
            className="w-full border border-gray-600 rounded-md px-3 py-2 bg-gray-700 text-white"
          />
          {errors.name && (
            <span className="text-red-500 mt-1">{errors.name}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="block mb-1">Price</label>
          <input
            name="price"
            onChange={handleChange}
            value={form.price || ""}
            type="text"
            className="w-full border border-gray-600 rounded-md px-3 py-2 bg-gray-700 text-white"
          />
          {errors.price && (
            <span className="text-red-500 mt-1">{errors.price}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="block mb-1">Published Date</label>
          <input
            name="published_date"
            onChange={handleChange}
            value={form.published_date || ""}
            type="text"
            className="w-full border border-gray-600 rounded-md px-3 py-2 bg-gray-700 text-white"
          />
          {errors.published_date && (
            <span className="text-red-500 mt-1">{errors.published_date}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            onChange={handleChange}
            value={form.description || ""}
            className="w-full border border-gray-600 rounded-md px-3 py-2 bg-gray-700 text-white"
            rows={5}
          />
          {errors.description && (
            <span className="text-red-500 mt-1">{errors.description}</span>
          )}
        </div>
        <button
          onClick={formSubmit}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md mt-4"
        >
          {isEditId ? "Edit Book" : "Add Book"}
        </button>
      </div>
    </div>
  );
};

export default AddBookForm;
