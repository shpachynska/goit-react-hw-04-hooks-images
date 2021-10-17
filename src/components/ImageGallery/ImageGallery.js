import React, { useState } from "react";

import styles from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Modal from "../Modal/Modal";

export default function ImageGallery({ images }) {
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [tags, setTags] = useState("");

  const imgClickHandler = (largeImageURL, tags) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

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
            onClick={() => imgClickHandler(image.largeImageURL, image.tags)}
          />
        ))}
      </ul>

      {showModal && (
        <Modal onClose={toggleModal} src={largeImageURL} alt={tags} />
      )}
    </div>
  );
}
