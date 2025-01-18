import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Hang on tight while we fetch your data 🚀!</p>
    </div>
  );
};

export default Loader;
