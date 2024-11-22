import React from "react";

const Loading = () => {
  return (
    <div style={styles.overlay}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden"></span>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional background color to darken the screen
    zIndex: "9999", // Ensure it appears on top of other elements
  },
};

export default Loading;
