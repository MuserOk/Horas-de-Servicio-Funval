import React from "react";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import HorasDeServicio from "./pages/HorasDeServicio";
import General from "./pages/General";
import LaBrujula from "./pages/LaBrujula";
import Login from "./pages/login";
import Footer from "./components/Footer";
import Header from "./components/Header";


export default function App() {
  // el dark mode se aplica segun la configuracion del usuario (automático)
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
  // --------------------------------------------------------------------

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-[url(/images/background_elements.svg)] bg-cover">
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
