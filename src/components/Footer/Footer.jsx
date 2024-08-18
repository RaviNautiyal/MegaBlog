import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <section className="bg-red-800 text-red-200 py-12 border-t border-red-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Logo and Copyright Section */}
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
            <div className="flex flex-col items-start">
              <Logo width="80px" />
              <p className="mt-4 text-sm text-red-400">
                &copy; 2023 DevUI. All rights reserved.
              </p>
            </div>
          </div>
          {/* Company Links */}
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold text-red-300 mb-4">Company</h3>
            <ul>
              <li className="mb-2">
                <Link className="text-base text-red-200 hover:text-white transition duration-300" to="/">Features</Link>
              </li>
              <li className="mb-2">
                <Link className="text-base text-red-200 hover:text-white transition duration-300" to="/">Pricing</Link>
              </li>
              <li className="mb-2">
                <Link className="text-base text-red-200 hover:text-white transition duration-300" to="/">Affiliate Program</Link>
              </li>
              <li>
                <Link className="text-base text-red-200 hover:text-white transition duration-300" to="/">Press Kit</Link>
              </li>
            </ul>
          </div>
          {/* Support Links */}
          <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold text-red-300 mb-4">Support</h3>
            <ul>
              <li className="mb-2">
                <Link className="text-base text-red-200 hover:text-white transition duration-300" to="/">Account</Link>
              </li>
              <li className="mb-2">
                <Link className="text-base text-red-200 hover:text-white transition duration-300" to="/">Help</Link>
              </li>
              <li className="mb-2">
                <Link className="text-base text-red-200 hover:text-white transition duration-300" to="/">Contact Us</Link>
              </li>
              <li>
                <Link className="text-base text-red-200 hover:text-white transition duration-300" to="/">Customer Support</Link>
              </li>
            </ul>
          </div>
          {/* Legal Links */}
          <div className="w-full md:w-1/2 lg:w-1/4">
            <h3 className="text-lg font-semibold text-red-300 mb-4">Legals</h3>
            <ul>
              <li className="mb-2">
                <Link className="text-base text-red-200 hover:text-white transition duration-300" to="/">Terms & Conditions</Link>
              </li>
              <li className="mb-2">
                <Link className="text-base text-red-200 hover:text-white transition duration-300" to="/">Privacy Policy</Link>
              </li>
              <li>
                <Link className="text-base text-red-200 hover:text-white transition duration-300" to="/">Licensing</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
    