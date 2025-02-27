import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={css.homeWrapper}>
      <h1 className={css.title}>Find your perfect rental car</h1>
      <p className={css.paragraph}>
        Reliable and budget-friendly rentals for any journey
      </p>
      <button type="button" style={{ width: 276, height: 44 }}></button>
    </div>
  );
};

export default HomePage;
