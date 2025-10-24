import Home from "./pages/Home";
import HorasDeServicio from "./pages/HorasDeServicio";
import General from "./pages/General";
import LaBrujula from "./pages/LaBrujula";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProtectedRoute from "./components/protectedRoute"
import PaginaDeBienvenida from "./pages/PaginaDeBienvenida";
import { useEffect } from "react";
import { AuthProvider } from "./auth/AuthContext";
<<<<<<< HEAD
import { Routes, Route } from "react-router";
=======
import { Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
>>>>>>> 2c4490a954f53235a6219d8393a7fff157630bc3


export default function App() {
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

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, []);
  // --------------------------------------------------------------------

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen max-w-screen">
        <Header />
<<<<<<< HEAD
        <main className="relative min-h-screen flex-1 flex items-center bg-[url(/images/background_elements.svg)] bg-no-repeat dark:bg-gray-800 bg-cover lg:justify-end">
=======
        <main className="relative flex place-items-center-safe bg-white grow bg-[url(/images/background_elements.svg)] bg-no-repeat dark:bg-gray-800 bg-cover lg:justify-end">
>>>>>>> 2c4490a954f53235a6219d8393a7fff157630bc3
          <Routes>
            <Route path="/" element={<PaginaDeBienvenida />} />

            <Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/General" element={<ProtectedRoute><General /></ProtectedRoute>} />
            <Route path="/HorasDeServicio" element={<ProtectedRoute><HorasDeServicio /></ProtectedRoute>} />
            <Route path="/LaBrujula" element={<ProtectedRoute><LaBrujula /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />

          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
