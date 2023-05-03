import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withCSSVariables
      withNormalizeCSS
      withGlobalStyles
    >
      <main style={{ display: "grid", placeItems: "center", gap: 10 }}>
        <App />
      </main>
    </MantineProvider>
  </React.StrictMode>
);
