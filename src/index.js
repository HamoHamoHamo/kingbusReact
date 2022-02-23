import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./pages";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./store";

ReactDOM.render(
  <BrowserRouter>
    <AppProvider>
      <Root />
    </AppProvider>
  </BrowserRouter>,
  document.getElementById('root')
);