import { useState } from "react";
import { Navigation } from "../Navigation/Navigation";
import css from "./App.module.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navigation />
      <div></div>
    </>
  );
}

export default App;
