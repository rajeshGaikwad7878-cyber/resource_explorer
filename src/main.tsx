import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { CharactersPage } from "./pages/CharactersPage";
import { CharacterDetail } from "./pages/CharacterDetail";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<CharactersPage />} />
          <Route path="characters/:id" element={<CharacterDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
