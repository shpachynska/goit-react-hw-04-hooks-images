import { useState } from "react";
import styles from "./Searchbar.module.css";

export default function Searchbar({ onSubmit }) {
  const [searchRequest, setSearchRequest] = useState("");
  // const [page] = useState(1);

  const handleInputChange = (event) => {
    setSearchRequest(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchRequest.trim() === "") {
      alert("Enter your search query!");
      return;
    }
    // onSubmit(searchRequest, page);
    onSubmit(searchRequest);
    setSearchRequest("");
    event.target.reset();
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchForm__button}>
          <span className={styles.SearchForm__buttonLabel}>Search</span>
        </button>

        <input
          className={styles.SearchForm__input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}
