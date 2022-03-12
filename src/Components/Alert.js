import React from "react";

const Alert = ({ message, success }) => {
  return (
    <div
      className={`alert alert-${success ? "success" : "danger"} mt-3`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Alert;


