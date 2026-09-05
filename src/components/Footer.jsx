import React from 'react';
import screenImg from './../assets/screen.png';

const Footer = () => {
  return (
    <footer className=" text-gray-400 py-12  ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <img src={screenImg} alt="Zyroo" className="h-9 w-auto" />
              <span className="text-lg font-bold tracking-tight text-white">Zyroo</span>
            </div>
            <p className="text-xs text-gray-900">
              Simple local delivery, managed better. Fast, reliable, and optimized for your business logistics.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-700 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-gray-700 transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-gray-700 transition-colors">Orders</a></li>
              <li><a href="#" className="hover:text-gray-700 transition-colors">Track Delivery</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-700 transition-colors">Dispatch Help Center</a></li>
              <li><a href="#" className="hover:text-gray-700 transition-colors">Hub Status</a></li>
              <li><a href="#" className="hover:text-gray-700 transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-gray-700 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal / Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-700 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Zyroo Inc. All rights reserved.</p>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <span className="size-2 rounded-full bg-emerald-500"></span>
            <span>All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;