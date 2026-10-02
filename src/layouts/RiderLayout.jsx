import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RiderLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-gray-900">
      
      {/* Navbar */}
      <Navbar />

      {/* Rider Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}