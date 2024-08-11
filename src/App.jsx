import React from "react";
import Homepage from "./pages/Homepage";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Homepage />
    </ErrorBoundary>
  );
}

export default App;
