/* eslint-disable react/prop-types */
import React from "react";
import { Typography } from "@mui/material";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

function FallbackComponent({ error, resetErrorBoundary }) {
  return (
    <div
      style={{
        backgroundColor: "#171717",
        textAlign: "center",
        color: "#fff",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: 100,
        overflow: "hidden",
      }}
    >
      <Typography variant={"h5"}>Something went wrong.</Typography>
      <p>Sorry, something went wrong while rendering this page.</p>
      <button onClick={resetErrorBoundary}>Try again</button>
      <p>{error.message}</p>
    </div>
  );
}

function ErrorBoundary({ children }) {
  return (
    <ReactErrorBoundary FallbackComponent={FallbackComponent}>
      {children}
    </ReactErrorBoundary>
  );
}

export default ErrorBoundary;
