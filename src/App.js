import styles from "./App.module.css";
import React, { useState, useEffect } from "react";
import galleryAPI from "./services/gallery-api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Searchbar from "./components/Searchbar/Searchbar";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ErrorView from "./components/ErrorView/ErrorView";
import Button from "./components/Button/Button";

export default function App() {
  const [searchRequest, setSearchRequest] = useState("");
  const [page, setPage] = useState("");
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [button, setButton] = useState(false);

  useEffect(() => {
    if (searchRequest === "") {
      return;
    }

    setLoading(true);
    setStatus("pending");

    galleryAPI
      .fetchImages(searchRequest, page)
      .then((result) => {
        if (result.total === 0) {
          setStatus("rejected");
          setLoading(false);
          setError("There is no such images");
        } else {
          setStatus("resolved");
          setImages((prevImages) => [...prevImages, ...result.hits]);
          setLoading(false);
          setButton(result.total > 12 * page);
        }
      })
      .then(page !== 1 && scrollPage)
      .catch((error) => {
        setStatus("rejected");
        setError(error);
      });
  }, [searchRequest, page]);

  const scrollPage = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const onLoadMoreClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleInputSubmit = (userInput) => {
    setSearchRequest(userInput);
    setPage(1);
    setImages([]);
  };

  return (
    <div className={styles.listContainer}>
      <Searchbar onSubmit={handleInputSubmit} />
      {status === "idle" && (
        <div className={styles.startLabel}>Enter your search query!</div>
      )}
      {status === "pending" && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      )}
      {status === "rejected" && <ErrorView />}
      {status === "resolved" && (
        <ImageGallery searchRequest={searchRequest} images={images} />
      )}

      {button && <Button onClick={onLoadMoreClick} />}
    </div>
  );
}

//==============================================
