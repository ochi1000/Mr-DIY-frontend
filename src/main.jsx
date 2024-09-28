// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import './index.css'
import "./styles/globals.css";
import "./styles/animate.css";
import "./styles/slick.css";
import "./styles/swiper-bundle.css";
import store from "./Redux/store";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  // <StrictMode>862148088321-5bvg7nvjip300vn8piqa72v0qhr58fp5.apps.googleusercontent.com
  <GoogleOAuthProvider clientId="319976990423-e1h3jo5lvfiob2s58bdiat61vcf27h1j.apps.googleusercontent.com">
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
  // </StrictMode>
);
