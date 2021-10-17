import { Component } from "react";
import styles from "./Searchbar.module.css";

export default class Searchbar extends Component {
  state = {
    searchRequest: "",
    page: 1,
  };

  handleInputChange = (event) => {
    this.setState({ searchRequest: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    const { searchRequest, page } = this.state;
    event.preventDefault();

    if (searchRequest.trim() === "") {
      alert("Enter your search query!");
      return;
    }
    this.props.onSubmit(searchRequest, page);
    this.setState({ searchRequest: "" });
    event.target.reset();
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchForm__button}>
            <span className={styles.SearchForm__buttonLabel}>Search</span>
          </button>

          <input
            className={styles.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}
