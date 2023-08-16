import React from "react";
import MainRoute from "./routes/mainRoute";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <HelmetProvider>
      <MainRoute />
    </HelmetProvider>
  );
}

export default App;
