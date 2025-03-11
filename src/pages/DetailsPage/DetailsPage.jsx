import css from "./DetailsPage.module.css";

const DetailsPage = () => {
  return (
    <div className={css.detailWrapper}>
      <div className={css.photoFormWrapper}>
        <div
          className={css.photo}
          // style={{ width: 640, height: 512, backgroundColor: "yellowgreen" }}
        >
          photo
        </div>
        <div
          className={css.form}
          // style={{
          //   width: 640,
          //   height: 488,
          //   backgroundColor: "gray",
          // }}
        >
          form
        </div>
      </div>

      <div className={css.descriptionWrapper}>
        <div
          className={css.titleDescription}
          // style={{ width: 488, height: 180, backgroundColor: "yellow" }}
        >
          title Description
        </div>
        <div
          className={css.description}
          // style={{ width: 488, height: 772, backgroundColor: "yellow" }}
        >
          description
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
