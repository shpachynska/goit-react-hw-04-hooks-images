import styles from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ id, src, alt, onClick, bigSrc }) {
  return (
    <>
      <li
        id={id}
        className={styles.ImageGalleryItem}
        onClick={(event) => {
          onClick(+event.currentTarget.id);
        }}
      >
        <img src={src} alt={alt} className={styles.ImageGalleryItem__image} />
      </li>
    </>
  );
}

export default ImageGalleryItem;
