import "./App.css";
import React, { Component } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Searchbar from "./components/Searchbar/Searchbar";

export default class App extends Component {
  state = {
    searchRequest: "",
    page: "",
  };

  handleInputSubmit = (userInput, page) => {
    this.setState({ searchRequest: userInput, page: page });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleInputSubmit} />
        <ImageGallery
          searchRequest={this.state.searchRequest}
          pageNum={this.state.page}
        />
      </div>
    );
  }
}
