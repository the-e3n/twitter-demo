import React from "react";

const Link = ({ to = "/", children, style = {}, ...rest }) => {
  return (
    <div
      style={{ cursor: "pointer", ...style }}
      onClick={() => (document.location = to)}
      {...rest}
    >
      {children}
    </div>
  );
};
export default Link;
