import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import ErrorPage from "./error-page";

import "../assets/styles/index.css";

import Root from "./routes/Root";
import Auteurs from "./routes/auteurs";
import Catalogue from "./routes/catalogue";
import Contact2 from "./routes/contact2";
import Faq from "./routes/faq";
import Presentation from "./routes/presentation";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/auteurs",
        element: <Auteurs />,
      },
      {
        path: "/catalogue",
        element: <Catalogue />,
      },
      {
        path: "/contact2",
        element: <Contact2 />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/presentation",
        element: <Presentation />,
      },
    ],
    
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);