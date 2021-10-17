import "./App.css";
import React, { useState } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Searchbar from "./components/Searchbar/Searchbar";

export default function App() {
  const [searchRequest, setSearchRequest] = useState("");
  const [page, setPage] = useState("");

  const handleInputSubmit = (userInput, page) => {
    setSearchRequest(userInput);
    setPage(page);
  };

  return (
    <div>
      <Searchbar onSubmit={handleInputSubmit} />
      <ImageGallery searchRequest={searchRequest} pageNum={page} />
    </div>
  );
}
