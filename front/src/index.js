import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from "react-router-dom";
import rootRouter from "./router/root";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={rootRouter} />
  </React.StrictMode>
);

reportWebVitals();
