import React from "react";
import "./Button.css";

const Button = ({
  label,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`button ${className}`}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
