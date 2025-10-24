import React from 'react'

// src/components/AdminPage.jsx
import { useState } from "react";
import CategoriesSection from "../components/admin/CategoriesSection";
import SchoolsSection from "../components/admin/SchoolsSection";
import ServicesSection from "../components/admin/ServicesSection";
import StudentsSection from "../components/admin/StudentsSection";
import UsersSection from "../components/admin/UsersSection";
import RolesSection from "../components/admin/RolesSection";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("categories");

  const tabs = [
    { id: "categories", label: "Categorías" },
    { id: "schools", label: "Escuelas" },
    { id: "services", label: "Servicios" },
    { id: "students", label: "Estudiantes" },
    { id: "users", label: "Usuarios" },
    { id: "roles", label: "Roles" },
  ];

  return (
    <div className="h-screen bg-blue-300/50 w-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-4">
          <h1 className="text-2xl font-bold text-blue-900/70">Panel de Administración</h1>
          <p className="text-sm text-gray-600 mt-1">Gestión de horas de servicio estudiantil</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === tab.id
                    ? "border-blue-300 text-blue-300"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen h-[74vh] overflow-y-auto overflow-x-scroll border border-gray-300 rounded-lg shadow-sm p-3">
        <main className="max-w-screen px-2 sm:px-4 lg:px-8 py-2">
          {activeTab === "categories" && <CategoriesSection />}
          {activeTab === "schools" && <SchoolsSection />}
          {activeTab === "services" && <ServicesSection />}
          {activeTab === "students" && <StudentsSection />}
          {activeTab === "users" && <UsersSection />}
          {activeTab === "roles" && <RolesSection />}
        </main>
      </div>
    </div>
  );
}