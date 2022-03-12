import React, { useState } from "react";
import Toast from "./Components/Toast";

export const ShowToast = (props) => {
  const { message, duration = 3000 } = props;
  const [visible, setVisible] = useState(true);

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Toast
      visible={visible}
      message={message}
      onClose={onClose}
      duration={duration}
    />
  );
};
