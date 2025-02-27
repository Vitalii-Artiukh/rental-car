import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.notFoundWrapper}>
      <h1>Not Found Page</h1>
      <Link to={"/"}>
        <button type="button" className={css.toHomeBtn}>
          Go to home page
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
