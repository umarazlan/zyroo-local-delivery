import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Hero from "./components/Hero";
import StatsSection from "./components/Stats";
import FeaturesSection from "./components/FeaturesSection";
import CtaSection from "./components/CtaSection";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import OrdersPage from "./components/pages/Orders";
import OrdersDetailsPage from "./components/pages/OrderDetails";
import TrackDelivery from "./components/pages/TrackDelivery";
import RiderDashboard from "./components/pages/RiderDashboard";

import MainLayout from "./layouts/MainLayout";
import RiderLayout from "./layouts/RiderLayout";

import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/pages/Unauthorized";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* Public routes */}
            <Route element={<MainLayout />}>
              <Route
                path="/"
                element={
                  <div className="flex flex-col gap-12">
                    <Hero />
                    <StatsSection />
                    <FeaturesSection />
                    <CtaSection />
                  </div>
                }
              />

              {/* Dashboard - Business only */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["business"]}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Orders - Business only */}
              <Route
                path="/orders"
                element={
                  <ProtectedRoute allowedRoles={["business"]}>
                    <OrdersPage />
                  </ProtectedRoute>
                }
              />

              {/* Order Details - Business only */}
              <Route
                path="/order-details"
                element={
                  <ProtectedRoute allowedRoles={["business"]}>
                    <OrdersDetailsPage />
                  </ProtectedRoute>
                }
              />

              {/* Tracking - Business, Rider, Customer */}
              <Route
                path="/track-delivery"
                element={
                  <ProtectedRoute
                    allowedRoles={["business", "rider", "customer"]}
                  >
                    <TrackDelivery />
                  </ProtectedRoute>
                }
              />

              {/* Unauthorized */}
              <Route path="/unauthorized" element={<Unauthorized />} />
            </Route>

            {/* Rider routes */}
            <Route element={<RiderLayout />}>
              <Route
                path="/rider"
                element={
                  <ProtectedRoute allowedRoles={["rider"]}>
                    <RiderDashboard />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}
