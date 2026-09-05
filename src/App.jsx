import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Hero from './components/Hero';
import StatsSection from './components/Stats';
import FeaturesSection from './components/FeaturesSection';
import CtaSection from './components/CtaSection';
import Dashboard from './components/pages/Dashboard';
import OrdersPage from './components/pages/Orders';
import OrdersDetailsPage from './components/pages/OrderDetails'
import TrackDelivery from './components/pages/TrackDelivery';
export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-50 text-gray-900">
        
        {/* Navbar */}
        <Navbar />

        {/* Main Content with clean vertical spacing (space-y-12) to prevent overlapping */}
        <main className="flex-grow">
          <Routes>
            {/* Home Page Layout */}
            <Route 
              path="/" 
              element={
                <div className="flex flex-col gap-12 ">
                  <Hero />
                  <StatsSection />
                  <FeaturesSection />
                  <CtaSection />
                </div>
              } 
            />

            {/* Dashboard Page (Chakra UI) */}
            <Route 
              path="/dashboard" 
              element={
                <div className="">
                  <Dashboard />
                </div>
              } 
            />

            {/* Orders Page */}
            <Route 
              path="/orders" 
              element={
                <div className="">
                  <OrdersPage />
                </div>
              } 
            />
            <Route 
              path="/order-details" 
              element={
                <div className="">
                  <OrdersDetailsPage />
                </div>
              } 
            />

            {/* Track Delivery Page */}
            <Route 
              path="/track-delivery" 
              element={
                <div className="">
                  <TrackDelivery />
                </div>
              } 
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </Router>
  );
}