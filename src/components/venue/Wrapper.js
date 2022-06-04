import React from "react";

export const Wrapper = ({
  children,
  wrapperHeight,
  wrapperWidth,
  screenTopOffset,
  screenLeftOffset,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          height: wrapperHeight,
          width: wrapperWidth,
          // outline: "1px solid black", // for debugging
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: screenTopOffset,
            left: screenLeftOffset,
            fontSize: 30,
            backgroundColor: "red",
            color: "white",
            padding: "10px 60px 4px 60px",
            fontWeight: "bold",
          }}
        >
          SCREEN
        </div>
        {children}
      </div>
    </div>
  );
};
