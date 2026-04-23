import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { CartProvider } from "./contexts/cart.context";
import { CategoriesProvider } from "./contexts/categories.context";
import { UserProvider } from "./contexts/user.context";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import "./index.scss";
import { ApolloProvider } from "@apollo/client/react";
import { HttpLink } from "@apollo/client";

const rootElement = document.getElementById("root");
const client = new ApolloClient({
  link: new HttpLink({ uri: "https://crwn-clothing.com/" }),
  cache: new InMemoryCache(),
});
render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <UserProvider>
          <CategoriesProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </CategoriesProvider>
        </UserProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  rootElement,
);
