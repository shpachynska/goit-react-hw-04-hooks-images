import React, { Component } from "react";
import galleryAPI from "../../services/gallery-api";
import styles from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Modal from "../Modal/Modal";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ErrorView from "../ErrorView/ErrorView";
import Button from "../Button/Button";

export default class ImageGallery extends Component {
  state = {
    images: null,
    page: 1,
    status: "idle",
    error: null,
    showModal: false,
    id: null,
    loading: false,
    button: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchRequest, pageNum } = this.props;
    const { page } = this.state;
    if (prevProps.searchRequest !== searchRequest) {
      this.setState({
        status: "pending",
        page: pageNum,
        loading: true,
      });
      console.log(pageNum);
      galleryAPI
        .fetchImages(searchRequest, pageNum)
        .then((images) => {
          if (images.total === 0) {
            this.setState({
              status: "rejected",
              loading: false,
              error: "There is no such images",
            });
          } else if (images.total > 12) {
            this.setState({
              status: "resolved",
              images: images.hits,
              loading: false,
              button: true,
            });
          } else {
            this.setState({
              status: "resolved",
              images: images.hits,
              loading: false,
              button: false,
            });
          }
        })
        .catch((error) => this.setState({ error, status: "rejected" }));
    }

    if (page !== 1 && prevState.page !== page) {
      galleryAPI
        .fetchImages(searchRequest, page)
        .then((images) => {
          this.setState({
            status: "resolved",
            images: [...prevState.images, ...images.hits],
            button: true,
            loading: false,
          });
        })
        .finally(this.scrollPage);
    }
  }

  scrollPage = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  imgClickHandler = (largeImageURL, tags) => {
    this.setState({ largeImageURL, tags });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onLoadMoreClick = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const { status, images, showModal, button } = this.state;

    if (status === "idle") {
      return <div className={styles.startLabel}>Enter your search query!</div>;
    }

    if (status === "pending") {
      return (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      );
    }

    if (status === "rejected") {
      return <ErrorView />;
    }

    if (status === "resolved") {
      return (
        <div className={styles.listContainer}>
          <ul className={styles.ImageGallery}>
            {images.map((image) => (
              <ImageGalleryItem
                src={image.webformatURL}
                alt={image.tags}
                key={image.id}
                id={image.id}
                bigSrc={image.largeImageURL}
                onClick={() =>
                  this.imgClickHandler(image.largeImageURL, image.tags)
                }
              />
            ))}
          </ul>
          {button && <Button onClick={this.onLoadMoreClick} />}
          {showModal && (
            <Modal
              onClose={this.toggleModal}
              src={this.state.largeImageURL}
              alt={this.state.tags}
            />
          )}
        </div>
      );
    }
  }
}
