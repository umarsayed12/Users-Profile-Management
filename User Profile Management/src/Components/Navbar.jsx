import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-blue-500 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <Link to="/" className="text-lg font-semibold">
            User Profile Manager
          </Link>
        </div>
        <div>
          <Link
            to="/"
            className={`mr-4 hover:text-gray-300 ${
              location.pathname === "/" ? "font-semibold" : ""
            }`}
          >
            Profiles
          </Link>
          <Link
            to="/admin"
            className={`mr-4 hover:text-gray-300 ${
              location.pathname === "/admin" ? "font-semibold" : ""
            }`}
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
