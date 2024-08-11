import React from "react";
import Homepage from "./pages/Homepage";
import ErrorBoundary from "./components/common/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Homepage />
    </ErrorBoundary>
  );
}

export default App;
