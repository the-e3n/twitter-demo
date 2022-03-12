import React, { useEffect } from "react";
import { Toast } from "react-bootstrap";

const ReactToast = (props) => {
  const { visible, message, onClose, duration } = props;
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, duration);
  }, []);

  return (
    <Toast show={visible} onClose={onClose}>
      <Toast.Header>
        <strong className="me-auto">Notification</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default (props) => {
  const { visible, message, success, onClose, ...rest } = props;
  return visible ? (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: "1000",
        display: "flex",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <ReactToast
        visible={visible}
        message={message}
        success={success}
        onClose={onClose}
        {...rest}
      />
    </div>
  ) : null;
};
