import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ApolloProvider } from "@apollo/client/react";
import client from "./apolloClient";
import AppRouter from "./routes/AppRouter";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  </StrictMode>
);
