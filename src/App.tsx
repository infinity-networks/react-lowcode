import React from "react";
import { Route, Link, BrowserRouter, Routes } from "react-router-dom";
import EditorPage from "./pages/editor";
import HomePage from "./pages/home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/editor" element={<HomePage />} />
        <Route path="/" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
