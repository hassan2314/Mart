import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import SmartCooking from "./pages/SmartCooking";
import Stores from "./pages/Stores";
import Media from "./pages/Media";
import UpdateProfile from "./pages/UpdateProfile";
import CreateProduct from "./pages/CreateProduct";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Define routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="products" element={<ProductPage />} />
      <Route path="smart-cooking" element={<SmartCooking />} />
      <Route path="stores" element={<Stores />} />
      <Route path="media" element={<Media />} />
      <Route path="update-profile" element={<UpdateProfile />} />
      <Route path="/products/create" element={<CreateProduct />} />
      {/* Add more routes here like smart-cooking, stores, media, etc. */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
