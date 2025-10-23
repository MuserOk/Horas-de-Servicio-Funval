import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HorasDeServicio from "./pages/HorasDeServicio";
import General from "./pages/General";
import LaBrujula from "./pages/LaBrujula";
import Login from "./pages/login";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  const [logIn, setLogIn] = useState(false);

  // el dark mode se aplica según la configuración del usuario (automático)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (mediaQuery.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header logIn={logIn} setLogIn={setLogIn} />
      <main className="flex-1 flex items-end bg-[url(/images/background_elements.svg)] bg-no-repeat dark:bg-gray-800 bg-cover">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/General" element={<General />} />
          <Route path="/HorasDeServicio" element={<HorasDeServicio />} />
          <Route path="/LaBrujula" element={<LaBrujula />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
