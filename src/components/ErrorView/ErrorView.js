import errorImage from "../../error.png";
import styles from "./ErrorView.module.css";

export default function ErrorView() {
  return (
    <div className={styles.notification} role="alert">
      <img src={errorImage} width="240" alt="sadcat" />
      <p>Nothing found!</p>
    </div>
  );
}
