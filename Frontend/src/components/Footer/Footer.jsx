import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white text-gray-800 mt-16 border-t">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6 py-12 text-center md:text-left">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-2 text-red-600">M&M's</h2>
          <p className="text-sm text-gray-600">
            Delivering quality food with flavor and freshness that satisfies
            your cravings every time.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? "text-red-500" : "hover:text-red-600"
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/smart-cooking"
                className={({ isActive }) =>
                  isActive ? "text-red-500" : "hover:text-red-600"
                }
              >
                SmartCooking®
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/stores"
                className={({ isActive }) =>
                  isActive ? "text-red-500" : "hover:text-red-600"
                }
              >
                Stores
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/media"
                className={({ isActive }) =>
                  isActive ? "text-red-500" : "hover:text-red-600"
                }
              >
                Media
              </NavLink>
            </li>
            <li>
              <Link to="/home-delivery" className="text-red-600 font-semibold">
                Home Delivery
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm text-gray-600">Email: support@mmfoods.com</p>
          <p className="text-sm text-gray-600">Phone: +92 300 1234567</p>
          <p className="text-sm text-gray-600">Location: Islamabad, Pakistan</p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 text-xl text-red-600">
            <a href="#" className="hover:text-red-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-red-400"><FaInstagram /></a>
            <a href="#" className="hover:text-red-400"><FaTwitter /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
