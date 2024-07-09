import React from "react";
import AddBookPage from "./pages/AddBookPage";

const App: React.FC = () => {
  return (
    <div className="App bg-gray-900 h-screen grid place-items-center">
      <AddBookPage />
    </div>
  );
};

export default App;
