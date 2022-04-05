import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./pages";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./Store";
import ScrollToTop from "./utils/ScrollTop";

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop />
    <AppProvider>
      <Root />
    </AppProvider>
  </BrowserRouter>,
  document.getElementById('root')
);